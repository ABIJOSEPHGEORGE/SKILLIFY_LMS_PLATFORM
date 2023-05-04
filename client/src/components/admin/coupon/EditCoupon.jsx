import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { updateCouponToggle, updateEditToggle } from '../../../redux/couponSlice'
import { Input, useSelect } from '@material-tailwind/react'
import { couponSchema } from '../../../validations/FormValidations'
import axios from 'axios'

function EditCoupon({fetchAcllCoupon}) {
    const dispatch = useDispatch()
    const {editToggle} = useSelector(state=>state.couponSlice)
    const [coupon,setCoupon] = useState({})

    useEffect(()=>{
        fetchCoupon()
    },[])
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            coupon_id:coupon?.coupon_id,
            minimum_purchase:coupon?.minimum_purchase,
            users_allowed:coupon?.users_allowed,
            expiry_date:coupon?.expiry_date,
            discount_amount:coupon?.discount_amount,
            maximum_discount_amount:coupon?.maximum_discount_amount,
        },
        validationSchema:couponSchema,
        onSubmit:values=>{
            updateCoupon(values)
        }
    })

    
    function updateCoupon(values){
        axios.put(`/admin/coupon/update/${coupon._id}`,values)
        .then((res)=>{
            toast.success("Coupon updated successfully")
            dispatch(updateEditToggle({toggle:false}));
            fetchAcllCoupon()
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
    }

     

    function fetchCoupon(){
        axios.get(`/admin/coupon/${editToggle.id}`)
        .then((res)=>{
            res.data.results.expiry_date =new Date(res.data.results.expiry_date).toISOString().split('T')[0];
            setCoupon(res.data.results)
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
    }
  return (
    <div className='p-3 absolute z-50'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
         <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Edit Coupon</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() =>dispatch(updateEditToggle({toggle:false})) }></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around gap-6" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <div className='w-full flex flex-col place-items-start place-content-center py-2 gap-4'>
                            <Input label='Coupon Id'  variant='static' type="text" name="coupon_id"  defaultValue={coupon?.coupon_id} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the coupon id" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.coupon_id && formik.touched.coupon_id ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.coupon_id}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center gap-4'>
                           
                            <Input label='Minimum Purchase' type='number' variant='static' name="minimum_purchase" defaultValue={coupon?.minimum_purchase}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the minimum purchase" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.minimum_purchase && formik.touched.minimum_purchase ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.minimum_purchase}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center gap-4'>
                           
                            <Input label='Users Allowed' type='number' variant='static' name="users_allowed" defaultValue={coupon?.users_allowed}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the number of users allowed" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.users_allowed && formik.touched.users_allowed ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.users_allowed}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center gap-4'>
                           
                            <Input label='Discount Amount' type='number' variant='static' name="discount_amount" defaultValue={coupon?.discount_amount}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the discount amount" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.discount_amount && formik.touched.discount_amount ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.discount_amount}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center gap-4'>
                           
                            <Input label='Maximum Discount Amount' type='number' variant='static' defaultValue={coupon?.maximum_discount_amount} name="maximum_discount_amount" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the maximum discount amount" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.maximum_discount_amount && formik.touched.maximum_discount_amount ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.maximum_discount_amount}</p>
                                )
                                : null
                               }
                        </div>
                       
                        <div className='w-full flex flex-col place-items-start place-content-center gap-4'>
                           
                            <Input label='Expiry Date' type='date' variant='static' name="expiry_date" defaultValue={coupon?.expiry_date}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Select the expiry date" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.expiry_date && formik.touched.expiry_date ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.expiry_date}</p>
                                )
                                : null
                               }
                        </div>
                       
                        <div className='py-2 px-3 flex place-content-end w-full'>
                            <button type='submit' className='text-white text-center font-semibold px-4 py-2 bg-primaryBlue rounded-sm w-2/5'>Update</button>
                        </div>
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditCoupon