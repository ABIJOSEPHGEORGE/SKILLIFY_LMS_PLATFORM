import React, { useEffect, useState } from 'react'
import NavBar from '../../components/users/NavBar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '../../redux/cartSlice';
import { details } from '../../config';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import {toast,ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

function Cart() {
    const dispatch = useDispatch();
    const {cart} = useSelector((state)=>state.cart)
    const [coupon,setCoupon] = useState("")

    useEffect(()=>{
        dispatch(fetchCartItems())
    },[])

    function deleteItem(id){
        axios.delete(`/user/cart/${id}`)
        .then((res)=>{
            toast.success("Item removed successfully");
            dispatch(fetchCartItems())
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    function applyCoupon(){
        alert(coupon)
    }


  return (
    <div className='w-full font-poppins'>
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        <div className="w-full bg-lightblue h-60">
            <NavBar/>
        <div className="w-full py-5 px-2 flex flex-col place-content-center place-items-center">
            <div className="w-4/5">
                <h2 className='text-3xl font-semibold '>Shopping Cart</h2>
            </div>
        </div>
        </div>
            {
            cart?.cartItems?.length > 0 ?
            <div className="w-full absolute top-40 py-5 px-2 flex  place-content-center place-items-center gap-10">
            <div className="w-4/5 flex place-content-between px-3">
                {
               
                cart?.cartItems?.map((item)=>(
                <div className="w-full bg-white shadow-xl rounded-md flex gap-6 place-items-center place-content-start p-3">
                    <div className="w-40">
                        <img src={details.base_url+item.course_image} className='rounded-md' alt="product_image" />
                    </div>
                    <div className='flex flex-2 flex-col place-content-start gap-5'>
                        <h2 className='text-2xl font-semibold font-poppins'>{item.course_title}</h2>
                        <div className="w-full flex gap-5 place-items-center">
                            <img className='w-10 h-10' src={item?.tutor?.profile_image ? details.base_url+item?.tutor?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                            <p>{item?.tutor?.first_name} {item?.tutor?.last_name}</p>
                        </div>
                        <div>
                            <p className='text-md text-gray-600 font-poppins'>{item?.curriculum.length} Lectures</p>
                        </div>
                    </div>
                    <div className="flex flex-1 gap-3 place-content-center place-items-center">
                        <div className='w-full flex flex-col gap-1'>
                            <h3 className='text-lg font-semibold '>₹ {item.course_sale_price}</h3>
                            <h3 className='text-lg font-semibold text-gray-600 line-through'>₹ {item.course_price}</h3>
                        </div>
                        <div>
                            <AiOutlineCloseSquare size={25} className='text-darkPink cursor-pointer' onClick={()=>deleteItem(item._id)}></AiOutlineCloseSquare>
                        </div>
                    </div>
                </div>
                   ))
                }
               
            </div>
            <div className="w-1/5 p-5 bg-secondary flex flex-col gap-3 shadow-md">
                <h1 className='text-md font-semibold font-poppins'>Cart Total</h1>
                {
                    cart?.cartItems?.map((item)=>(
                        <div className='w-full flex place-content-between border-b-2 border-gray-200 gap-3 py-1'>
                            <p className='w-3/5 text-sm'>{item.course_title}</p>
                            <p>₹ {item.course_sale_price}</p>
                        </div>
                    ))
                }

            <div className="w-full flex flex-col gap-3 place-content-center">
                    <Input className='bg-white rounded-none' color='pink' name='coupon' value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder='Enter Coupon'/>
                    <div className="w-full">
                        <button className='text-sm' onClick={()=>applyCoupon()}>Apply Coupon</button>
                    </div>
                   
                </div>

                <div className='w-full flex gap-2 place-content-between'>
                    <p className='text-xl font-semibold '>Sub Total : </p>
                    <p className='font-semibold'>₹ {cart.subTotal}</p>
                </div>

                
               
                <Link to="/user/checkout" className='w-full bg-darkPink text-center text-white font-semibold'><button className='bg-darkPink px-3 py-2 text-white font-semibold'>Checkout</button></Link>
            </div>
            
             
        </div>
            :
                <div className='w-full flex flex-col place-content-center place-items-center gap-3'>
                    <img className='w-80 h-80' src="/empty-cart.gif" alt="" />
                    <p className='font-poppins text-2xl font-semibold'>Cart is empty</p>
                </div>
            }
        
       

    </div>
  )
}

export default Cart