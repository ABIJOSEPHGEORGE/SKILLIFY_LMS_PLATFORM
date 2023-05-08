import React, { useEffect,useRef,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCartItems, updateSubTotal } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/users/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import {Input} from '@material-tailwind/react'
import {useFormik} from 'formik'
import { checkoutSchema } from '../../validations/FormValidations';

import StripePayment from '../../components/payments/StripPayment';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';



function Checkout() {

  const {cart,subTotal} = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [payment,setPayment]= useState(false);
  const [billingAdd,setBillingAdd] = useState('')
  const [coupon,setCoupon] = useState("");
  const [applied,setApplied] = useState(false)
  const buttonRef = useRef()
  const errorRef = useRef()
  const discountRef =  useRef()
  
  useEffect(()=>{
    dispatch(fetchCartItems())
    dispatch(updateSubTotal(cart.subTotal));
  },[])


  useEffect(()=>{
    if(coupon!==""){
      buttonRef.current?.classList.remove('hidden');
      errorRef.current?.classList.remove("hidden");
      errorRef.current.innerText = ""
    }else{
      buttonRef.current?.classList.add('hidden');
      errorRef.current?.classList.add("hidden");
    }
  },[coupon])

 
  async function applyCoupon(){
    try{
      const res = await axios.post('/user/coupon/apply-coupon',{coupon:coupon});
      if(res.data.results){
        setApplied(true);
        dispatch(updateSubTotal(res.data.results.subTotal));
        discountRef.current.innerText = res.data.results.discount;
        errorRef.current.innerText = "Coupon Applied Successfully"
        errorRef.current?.classList.add('text-green-500')
        errorRef.current?.classList.remove('text-red-500')
      }
    }catch(err){
      if(err.response.status===400){
        errorRef.current?.classList.remove('text-green-500')
        errorRef.current?.classList.add('text-red-500')
        errorRef.current.innerText = err.response.data.message
      }else{
        toast.error("Something wen't wrong...")
      }
    }
  }

  function cartCheck(){
    if(cart?.cartItems?.length===0){
      return navigate('/user/cart',{replace:true});
    }
  }

  function clearCoupon(){
        setApplied(true);
        setCoupon("")
        dispatch(updateSubTotal(cart?.subTotal));
        discountRef.current.innerText = 0
        setApplied(false)
  }

  cartCheck()
  
  const formik = useFormik({
    initialValues:{
      first_name:"",
      last_name:"",
      state:"",
      country:"",
      email:'',
    },
    validationSchema:checkoutSchema,
    onSubmit:(values)=>{
        setBillingAdd(values)
        setPayment(true);
    }
  })
  
  return (
    <div className='w-full font-poppins'>
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        <div className="w-full bg-lightblue h-40">
            <NavBar/>
        <div className="w-full py-5 px-2 flex flex-col place-content-center place-items-center">
            <div className="w-4/5">
                <h2 className='text-3xl font-semibold '>Checkout</h2>
            </div>
        </div>
        </div>
        <div className="w-full place-content-center flex place-items-center p-5">
          <div className="w-3/5 flex flex-col place-content-center place-items-center">
              <form className='w-full px-10 flex flex-col gap-6' onSubmit={formik.handleSubmit}>
                <div className="w-full flex gap-3 place-items-start">
                    <div className='w-full'>
                      <Input type='text' variant='static' label='First Name' name='first_name' value={formik.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {
                        formik.errors.first_name && formik.touched.first_name &&
                        <p className='text-red-600 font-extralight text-md'>{formik.errors.first_name}</p>
                      }
                    </div>
                    <div className='w-full'>
                      <Input type='text' variant='static' label='Last Name' name='last_name' value={formik.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {
                        formik.errors.last_name && formik.touched.last_name &&
                        <p className='text-red-600 font-extralight text-md'>{formik.errors.last_name}</p>
                      }
                    </div>
                 </div>
                 <div className="w-full">
                      <Input type='text' variant='static' label='State' name='state' value={formik.state} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {
                        formik.errors.state && formik.touched.state &&
                        <p className='text-red-600 font-extralight text-md'>{formik.errors.state}</p>
                      }
                 </div>
                 <div className="w-full">
                      <Input type='text' variant='static' label='Email' name='email' value={formik.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {
                        formik.errors.email && formik.touched.email &&
                        <p className='text-red-600 font-extralight text-md'>{formik.errors.email}</p>
                      }
                 </div>
                <div className='w-full'>
                    <Input type='text' variant='static' label='county' name='country' value={formik.country} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {
                        formik.errors.country && formik.touched.country &&
                        <p className='text-red-600 font-extralight text-md'>{formik.errors.country}</p>
                      }
                </div>
                
              </form>
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
                <div className='w-full flex flex-col gap-2 place-content-between'>
                  <div className="w-full flex flex-col gap-3 place-content-center">
                    <div className="flex flex-col gap-2">
                      <Input className='bg-white rounded-none' color='pink' name='coupon' label='Do you have a coupon ?' value={coupon} onChange={(e)=>setCoupon(e.target.value)}/>
                      <p className='text-sm text-red-500 hidden' ref={errorRef}></p>
                    </div>
                    <div className="w-full">
                      {
                        !applied ?
                        <button className='text-sm  text-darkPink hidden' onClick={()=>applyCoupon()} ref={buttonRef}>Apply Coupon</button>
                        :
                        <button className='text-sm text-darkPink flex place-items-center gap-1' onClick={()=>clearCoupon()}>Clear Coupon <AiOutlineClose size={15}></AiOutlineClose></button>
                      }
                        
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 place-items-start">
                    <p className='text-sm font-normal'>Discount Applied : ₹<span ref={discountRef}>0</span></p>
                    <p className='text-xl font-semibold '>Sub Total : <span>₹ {subTotal}</span></p>
                  </div>

                </div>
               
                <button className='bg-darkPink px-3 py-2 text-white font-semibold focus:outline-none' type='submit' onClick={formik.handleSubmit}>Proceed to pay</button>
            </div>
        </div>
         {
          payment &&
          <StripePayment billing_address={billingAdd} coupon={coupon}/>
         }
    </div>
  )
}

export default Checkout