const mongoose = require('mongoose');

const sub_category = {
    sub_category_name:{
        type:String,
        unique:true
    },
    sub_category_description:{
        type:String
    },

}

const Category = mongoose.model('Category',new mongoose.Schema({
    category_name:{
        type:String,
        unique:true,
    },
    category_image:{
       image:{
        type:String,
       },
       cloudinary_id:{
        type:String
       }
    },
    description:{
        type:String
    },
    sub_category:[
        sub_category
    ],
    status:{
        type:Boolean,
        default:false
    }
}))

module.exports = Category;