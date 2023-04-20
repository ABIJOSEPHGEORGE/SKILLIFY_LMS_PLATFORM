const {error,success} = require('../../responseApi');
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const User = require('../../models/userSchema')
module.exports = {
    createOrder:async(req,res)=>{
        try{

        }catch(err){
            res.status(500).json(error("Something wen't wrong,Try after sometimes"));
        }
    },
    stripeCheckout:async(req,res)=>{
        try{
           //calculating the total cart amount
           const user = await User.findOne({email:req.user}).populate('cart')
           const cartTotal = user.cart.reduce((acc,curr)=>{acc=acc+curr.course_sale_price});
           console.log(cartTotal)
           const charge = await stripe.charges.create({
            amount:cartTotal*100,
            currency:'inr',
            source:req.body.token.id,
            description:"Payment towards skillify"
           })
           res.status(200).json({success:true})
        }catch(err){
            res.status(500).json(error("Something wen't wrong,Try after sometimes"));
        }
    }
}