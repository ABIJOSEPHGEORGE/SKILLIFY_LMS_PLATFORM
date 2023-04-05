const User = require("../../models/userSchema");
const { success, error, validation } = require("../../responseApi");

module.exports = {
    //instructor signup
    // get onboarding experience details
    // store details
    // update user status
    instructorSignup:async(req,res)=>{
        try{
            const {experience_mode,experience_years} = req.body;
            //updating the experience details
            const response = await User.findOneAndUpdate({email:req.user},{instructor_details:req.body,instructor:true});
            res.status(200).json(success("OK",{role:'instructor'},res.statusCode))
        }catch(err){
            res.status(500).json(error("Something went wrong, Please try after sometimes..."))
        }
    }
}