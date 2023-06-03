import React, { useEffect,useState } from 'react'
import NavBar from '../users/NavBar'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ConfirmOrder({orderId}) {
    sessionStorage.removeItem('orderId');
    const [order,setOrder] = useState(null)
    useEffect(()=>{
        axios.put('/user/order-confirmation',{orderId:orderId})
        .then((res)=>{
           setOrder(res.data.results)
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
    },[])
  return (
    <div className='w-full h-screen font-poppins'>
        <div className="w-full absolute top-0">
            <NavBar/>
        </div>
        <div className="w-full h-full flex gap-3">
            <div className="w-3/5 flex flex-1 place-content-center bg-secondary place-items-center gap-4">
                <div className=" w-full p-5 h-80 flex flex-col gap-4">
                    <div className="flex flex-col gap-3 place-content-center place-items-center">
                        <h1 className='text-6xl font-bold text-center font-poppins'>Thank You</h1>
                        <h3 className='text-center font-semibold text-3xl font-poppins'>For your order</h3>
                    </div>
                    <div className='flex flex-col w-full px-5 gap-3'>
                            <p className='w-full text-sm text-center font-normal leading-8'>
                            "Dear Skillify user,

                                Thank you for choosing Skillify for your e-learning needs. We're committed to providing you with high-quality educational content that helps you reach your full potential.

                                We appreciate your support and are grateful for the opportunity to serve you. If you have any feedback or suggestions, we'd love to hear from you.

                                Thank you for placing an order on our website. We hope you enjoy your learning journey with us.
                                <br></br>
                                Best regards,
                                
                            </p>
                            <h1 className='font-semibold text-center'>Abin George</h1>
                            <h2 className='font-semibold text-center'>Founder of Skillify</h2>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-1 h-full bg-white place-content-center place-items-start">
                <div className="flex place-items-center gap-3 flex-col">
                    <img src="/order-sucess.gif" className='w-3/5' alt="" />
                    
                    <h1 className='font-semibold text-3xl'>Order Successfully Placed</h1>
                    <div className='w-full flex flex-col place-items-center'>
                        <h2>Your order no : <span className='font-semibold'>{order?.order_id}</span></h2>
                    </div>
                    <p className='text-lg font-normal text-center'>If you have any question about your order, you can email us at<br></br><span className='font-semibold'>info@skillify.com</span></p>
                    <Link to='/user/my-learning' className='text-white bg-darkPink rounded-3xl py-3 px-5 font-semibold'>Go to My Learning's</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConfirmOrder