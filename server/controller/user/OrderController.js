const {error,success} = require('../../responseApi');
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const User = require('../../models/userSchema');
const short = require('short-uuid');
const Order = require('../../models/orderSchema');
const { default: mongoose } = require('mongoose');
const Course = require('../../models/courseSchema');


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
            
            response.courses.forEach(async(courseId)=>{
                //total session and total content in the active session
                const eachCourse = await Course.findOne({_id:courseId});
                const completion_status = eachCourse.curriculum.map((session, index) => {
                    const sessionStatus = {
                        active_content: 1,
                        total_content: session.content.length,
                        completed: false,
                        session_id:session.session_id,
                    };
                
                    sessionStatus.content = session.content.map((content, index) => {
                        let contentStatus = {
                            _id: content._id,
                            content_type: content.content_type,
                            completed: false

                        };
                
                        if (content.content_type === 'lecture') {
                            contentStatus.video_id = content.video_id;
                        } else if (content.content_type === 'quiz') {
                            contentStatus.quiz_id = content.quiz_id;
                        } else if (content.content_type === 'assignment') {
                            contentStatus.assignment_id = content.assignment_id;
                        }
                
                        return contentStatus;
                    });
                
                    return sessionStatus;
                });
                

               const status = await User.findOneAndUpdate({ email: req.user },{$push:{enrolled_course: {course_id: courseId,progress: 0,
                                completion_status: completion_status
                            }
                        }
                    }
                );
                console.log(status)
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