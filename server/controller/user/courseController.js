const Course = require("../../models/courseSchema");
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
    }
}