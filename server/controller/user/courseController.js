const { default: mongoose } = require("mongoose");
const Course = require("../../models/courseSchema");
const User = require("../../models/userSchema");
const { error, success } = require("../../responseApi");
module.exports = {
    getCourses:async(req,res)=>{
        try{
            //configuring filter , sort and pagination
            const category = req.query.category === undefined || req.query.category=== "All" ? {} : { "category.category_name": req.query.category };
            const sub_category = req.query.sub_category === undefined || req.query.sub_category==="All" ? {} : {"sub_category":req.query.sub_category};
            const price = req.query.price === undefined || req.query.price==="All" ? {} : {"isFree":JSON.parse(req.query.price)};
            const searchKey = req.query.search === "null" ? {} : {"course_title" : {$regex:req.query.search,$options: "i"}}
            
            //pagination
            const productPerPage = 5;
            const page = req.query.p??1;

            //sorting
            const sort = parseInt(req.query.sort);


            const filter = { $and: [category,sub_category,price,searchKey]};

            const courses = await Course.aggregate([
            { $lookup: { from: "categories", localField: "category", foreignField: "_id", as: "category" } },
            { $unwind: "$category" },
            { $match: filter },
            {$skip:(page-1)*productPerPage},
            {$limit:productPerPage},
            {$sort:{"course_sale_price":sort}}
            ]);
            console.log(courses)
            return res.status(200).json(success("OK",{courses:courses,currentPage:page,hasNextPage:productPerPage*page<courses.length,nextPage:parseInt(page)+1,lastPage:Math.ceil(courses.length/productPerPage)}))
        }catch(err){
            console.log(err)
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    },
    singleCourse:async(req,res)=>{
        try{
            const course = await Course.findOne({_id:req.params.id})
            return res.status(200).json(success("OK",course))
        }catch(err){
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    },
    isEnrolled:async(req,res)=>{
        try{
            //finding the user
            const user = await User.findOne({email:req.user});
            //finding the course is enrolled or not
            req.params.id = new mongoose.Types.ObjectId(req.params.id).toString()
            const isEnrolled = user.enrolled_course.find(course=>course.course_id.toString()===req.params.id)
            if(isEnrolled){
                return res.status(200).json(success("OK",true))
            }else{
                return res.status(200).json(success("OK",false))
            }
        }catch(err){
            console.log(err)
            return res.status(500).json(error("Something went wrong"));
        }
    },
    enrolledCourses:async(req,res)=>{
        try{
            //fetching all courses enrolled by user
            const courses = await User.findOne({email:req.user}).populate({path:"enrolled_course.course_id"});
            res.status(200).json(success("OK",courses.enrolled_course))
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    },
    courseProgress:async(req,res)=>{
        try{
            const completion_status = await User.findOne({email:req.user,enrolled_course:{$elemMatch:{course_id:req.params.id}}})
            .select('enrolled_course.$')
            res.status(200).json(success('OK',completion_status));
        }catch(err){
            res.status(500).json(error("Something wen't wrong, Try after sometimes"))
        }
    }
}