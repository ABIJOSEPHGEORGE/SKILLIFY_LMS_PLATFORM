const Course = require('../../models/courseSchema');
const Orders = require('../../models/orderSchema');
const {error, success} = require('../../responseApi');
module.exports = {
    dashboardContents:async(req,res)=>{
        try{
            //finding the total approved course
            const approved_courses = await Course.find({'tutor.email':req.user,status:true});
            const pending_course = await Course.find({'tutor.email':req.user,status:false});
            
            
            // Find all courses taught by the instructor
            const courses = await Course.find({ 'tutor.email': req.user }, '_id');

            if (!courses.length) {
            console.log('No courses found for instructor.');
            return;
            }

            const courseIds = courses.map(course => course._id);

            // Find all orders that include any of the courses' IDs and have a status of 'success'
            const orders = await Orders.find({ courses: { $in: courseIds }, status: 'success' }, 'bill_amount');

            if (!orders.length) {
            console.log('No completed orders found for instructor.');
            return;
            }

            const totalAmount = orders.reduce((sum, order) => sum + order.bill_amount, 0);
            const afterAdmin = totalAmount - totalAmount/100*15
            
             
            res.status(200).json(success("OK",{approved_courses:approved_courses.length,pending_courses:pending_course.length,totalAmount,afterAdmin}))
        }catch(err){
            console.log(err)
            res.status(500).json(error("Something went wrong..."))
        }
    },
    dashboardChart:async(req,res)=>{
        try{
            const ordersByMonth = await Orders.aggregate([
                // Unwind the courses array
                { $unwind: '$courses' },
                // Match orders for the given course IDs and instructor email
                {
                  $match: {
                    'courses.course_id': { $in: Course },
                    'courses.tutor.email': req.user,
                  },
                },
                // Lookup the courses collection to get the instructor's email address
                {
                  $lookup: {
                    from: 'courses',
                    localField: 'courses.course_id',
                    foreignField: '_id',
                    as: 'course',
                  },
                },
                // Unwind the course array
                { $unwind: '$course' },
                // Add a new field 'month' with the month of the order date
                {
                  $addFields: {
                    month: { $month: '$order_date' },
                  },
                },
                // Group the orders by month and calculate the total bill amount for each month
                {
                  $group: {
                    _id: { month: '$month' },
                    totalAmount: { $sum: '$bill_amount' },
                  },
                },
                // Sort the results by month
                { $sort: { '_id.month': 1 } },
                
              ]);
              console.log(ordersByMonth)
              res.status(200).json(success("OK"))
        }catch(err){
            console.log(err)
            res.status(500).json(error("Somethiing went wrong..."))
        }
    }
}