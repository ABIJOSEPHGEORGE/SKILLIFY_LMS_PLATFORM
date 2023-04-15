const Course = require("../../models/courseSchema");
const { error, success } = require("../../responseApi");
module.exports = {
    getCourses:async(req,res)=>{
        try{
            const courses = await Course.find({})
            return res.status(200).json(success("OK",courses))
        }catch(err){
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    }
}