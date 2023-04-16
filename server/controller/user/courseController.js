const Course = require("../../models/courseSchema");
const { error, success } = require("../../responseApi");
module.exports = {
    getCourses:async(req,res)=>{
        try{
            //configuring filter , sort and pagination
            const category = req.query.category==="All"||undefined ? {} : req.query.category;
            filter = {$and:[{"category.category_name":""}]}
            const courses = await Course.aggregate([{$lookup:{from:"categories",localField:"category",foreignField:"_id",as:"category"}},{$unwind:"$category"},{$match:filter}])
            console.log(courses)
            return res.status(200).json(success("OK",courses))
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