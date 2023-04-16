const mongoose = require('mongoose')



const cart = {
    
        type:mongoose.Types.ObjectId,
        ref:'Course'
    
}
const User = mongoose.model('User',new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    email_verified:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
    },
    phone:{
        tpe:Number
    },
    password:{
        type:String,
        required:true,
    },
    cart:[
        cart
    ],
    enrolled_course:{
        type:Array,
    },
    status:{
        type:Boolean,
        default:false,
    },
    instructor:{
        type:Boolean,
        default:false,
    },
    student:{
        type:Boolean,
        default:true,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    instructor_details:{
       experience_mode:{
        type:String,
       },
       experience_years:{
        type:String,
       }
    },
    payout_method:{
        type:String,
    },
    certificates:{
        type:Array,
    },
    confirmationToken:{
        type:String,
    },
    profile_image:{
        type:String,
    }
    
},{timestamps:true}));

module.exports = User;