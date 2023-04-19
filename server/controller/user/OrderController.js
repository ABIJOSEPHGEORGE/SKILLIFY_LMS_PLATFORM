const {error,success} = require('../../responseApi')
module.exports = {
    createOrder:async(req,res)=>{
        try{

        }catch(err){
            res.status(500).json(error("Something wen't wrong,Try after sometimes"));
        }
    }
}