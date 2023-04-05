const Category = require("../../models/categorySchema");
const { error } = require("../../responseApi");

module.exports = {
    addCategory:async(req,res)=>{
        try{
            // getting category details
            const {category_description} = req.body;
            // converting category name into lowercase
            const category_name = req.body.category_name.replace(" ","-").toLoweCase();
            //checking whether category already exist 
            const isExist = await Category.findOne({category_name:category_name});
            if(isExist){
                return res.status(409).json(error("Category name already exist, choose another one"));
            }
            // creating new category
            
        }catch(err){
            return res.status(500).json(error("Something went wrong, Try after sometimes"));
        }
    }
}