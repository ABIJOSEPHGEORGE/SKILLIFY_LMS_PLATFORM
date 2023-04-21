const {error,success} = require('../../responseApi');
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const User = require('../../models/userSchema');
const short = require('short-uuid');
const Order = require('../../models/orderSchema');
const { default: mongoose } = require('mongoose');


module.exports = {
    stripPublishKey:async(req,res)=>{
        return res.status(200).json(success("OK",process.env.STRIPE_PUBLISH))
    },
    stripeCheckout:async(req,res)=>{
        try{
           //calculating the total cart amount
           const user = await User.findOne({email:req.user}).populate('cart')
           const cartTotal = user.cart.reduce((acc,curr)=>{
                acc = acc + curr.course_sale_price
                return acc;
           },0);
           
            //creating the order
            const billing_address = req.body;
            const order = await createOrder(billing_address,cartTotal,user)
           
           //creating stripe payment intent
           const paymentIntent = await stripe.paymentIntents.create({
            amount:cartTotal*100,
            currency:'inr',
            automatic_payment_methods:{
                enabled:true,
            },
           })
           console.log(order)
           res.status(200).json(success("OK",{client_secret:paymentIntent.client_secret,order_id:order._id}))
        }catch(err){
            console.log(err)
            res.status(500).json(error("Something wen't wrong,Try after sometimes"));
        }
    },
    orderConfirmation:async(req,res)=>{
        try{
            const response = await Order.findOneAndUpdate({_id:req.body.orderId},{status:'success'},{new:true});
            //clearing the user cart
            await User.findOneAndUpdate({email:req.user},{$set:{cart:[]}});
            //adding the purchased courses to user enrolled list
            
            response.courses.forEach(async(ele)=>{
                await User.findOneAndUpdate({email:req.user},{$push:{enrolled_course:{course_id:ele._id}}})
            })
            
            res.status(201).json(success("OK",response))
        }catch(err){
            console.log(err)
            return res.status(500).json(error("Something wen't wrong,Try after sometimes"))
        }
    }
}

async function createOrder(billing_address,cartTotal,user){
    try{
        //generating unique order id
        const orderId = short.generate();
        
        const newOrder = {
            order_id: orderId,
            bill_amount:cartTotal,
            billing_address:billing_address,
            order_date:new Date(),
            courses : user.cart,
        }

        const order = await Order.create(newOrder);
        return order;
    }catch(err){
        return err;
    }
}