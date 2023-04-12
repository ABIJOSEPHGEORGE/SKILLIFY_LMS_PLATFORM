const Course = require("../../models/courseSchema");
const { error, success } = require("../../responseApi")


module.exports ={
    uploadVideo:async(req,res)=>{
        try{
            if(req.file){
                return res.status(201).json(success("OK",{path:req.file.path}));
            }else{
                return res.status(415).json(error("Please upload a valid file"));
            }
        }catch(err){
            return res.status(500).json(error("Something wen't wrong, Try after sometimes"));
        }
    },
    createCourse:async(req,res)=>{
        try{
            req.body.course_image = req.files['course_image'][0].path;
            req.body.promotional_video = req.files['promotional_video'][0].path;
            req.body.curriculum = JSON.parse(req.body.curriculum);
            req.body.tutor = req.user;
            const course = await Course.create(req.body)
            
            return res.status(200).json(success("Course created successfully"));
            
        }catch(err){
            console.log(err)
            return res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    },
    getAllCourses:async(req,res)=>{
        try{
            
            const tutor = req.user;
            const courses = await Course.find({tutor:tutor});
            return res.status(200).json(success("OK",courses));
        }catch(err){
            console.log(err)
            return res.status(500).json(error("Something wen't wrong, Try after sometimes"));
        }
    },
    deletCourse:async(req,res)=>{
        try{
            const id = req.params.id;
            await Course.findOneAndDelete({_id:id})
            return res.status(200).json(success("OK"));
        }catch(err){
            return res.status(500).json(error("Something wen't wrong, Please try after sometimes"))
        }
    }
}