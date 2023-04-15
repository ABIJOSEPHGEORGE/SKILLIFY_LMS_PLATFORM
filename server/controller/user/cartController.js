const Course = require("../../models/courseSchema")
const User = require("../../models/userSchema")
const { error, success } = require("../../responseApi")

module.exports = {
    addToCart:async(req,res)=>{
        try{
            //checking whether product exist
            const isExist = await Course.findOne({_id:req.params.id})
            if(!isExist){
                return res.status(404).json(error("Course not found"));
            }
            //adding the item to cart
            await  User.findOneAndUpdate({email:req.user},{$addToSet:{cart:{courseId:req.params.id}}})
            res.status(200).json(success("OK"));
        }catch(err){
            console.log(err)
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    },
    existInCart:async(req,res)=>{
        try{
            const isExist = await User.findOne({email:req.user,cart:{$elemMatch:{courseId:req.params.id}}})
            if(isExist){
                return res.status(200).json(success("OK",true))
            }else{
                return res.status(200).json(success("OK",false))
            }
        }catch(err){
            res.status(500).json(error("Something went wrong, Try after sometimes"))
        }
    }
}