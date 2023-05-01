const User = require('../../models/userSchema')
const {success, error} = require('../../responseApi')
module.exports = {
    fetchAccountDetails:async(req,res)=>{
        try{
            const {first_name,last_name,description,email} = await User.findOne({email:req.user})
            res.status(200).json(success("OK",{first_name,last_name,description,email}));
        }catch(err){
            res.status(500).json(error("Something went wrong..."))
        }
    },
    updateProfileInfo:async(req,res)=>{
        try{
            const {first_name,last_name,description} = req.body;
            await User.findOneAndUpdate({email:req.user},{first_name,last_name,description});
            res.status(200).json(success("OK"));
        }catch(err){
            res.status(500).json(error("Something went wrong..."))
        }
    }
}