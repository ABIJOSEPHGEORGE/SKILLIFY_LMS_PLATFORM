import React from 'react'
import { Link, useLocation, useNavigate, } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { resetPassword } from '../../validations/AuthValidations'
import { ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation()
    const {values,errors,touched,handleSubmit,handleBlur,handleChange} = useFormik({
        initialValues:{
            password:'',
            confirm_password:''
        },
        validationSchema:resetPassword,
        onSubmit:async ({password,...rest})=>{
            axios.put('/reset-password',{password:password,user:location.state.user})
            .then((res)=>{
                navigate('/login',{replace:true,state:{msg:'Password successfully Updated'}});
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
    })
  return (
    <motion.div 
    initial={{opacity:0}} 
    animate={{opacity:1}} 
    exit={{opacity:0,transition:{duration:0.5}}}  className='flex flex-col md:flex md:flex-row w-100 h-screen font-poppins lg:overflow-y-hidden'>
    <ToastContainer limit={3} position={'top-center'} autoClose={1000}/>
        <div className=' w-100  md:w-3/6 lg:w-2/5 bg-primary flex justify-center items-center py-3 md:py-0'>
           <div className="flex-col w-100">
                <img src="/login/login-banner.png" alt="login-banner"  className='w-100 p-5'/>
                <h2 className='text-center text-white font-semibold text-xl md:text-3xl lg:text-4xl leading-8 md:leading-10 font-poppins '>Turn your ambition into a success story</h2>
                <p className=' font-medium text-white text-center py-2 text-sm md:text-lg'>Choose from over 100,000 online video.</p>
           </div>
        </div>
        <div className= 'w-full md:w-3/6 lg:w-3/5 p-3  md:p-5'>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="absolute flex justify-end items-center top-4 right-3">
                    <p className='px-3 text-primaryViolet'>Don't have an account ?</p>
                    
                    <Link to="/register"><button className='px-3 py-2 text-white bg-secondary'>Register</button></Link>
                </div>
                <div className='w-full lg:w-3/6'>
                    <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Please enter your new password!</h2>
                    <p className=' font-medium text-primaryViolet text-sm md:text-lg'>
                        Reset your password and continue the journey.
                    </p>
                    <form  className='flex flex-col w-full items-start' onSubmit={handleSubmit}>
                      
                        <div className='flex flex-col w-full pb-5'>
                            <label htmlFor="password" className='py-3'>Password</label>
                            <input type="password" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' values={values.password} onChange={handleChange} onBlur={handleBlur}/>
                            {
                                errors.password && touched.password ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.password}</p>
                                )
                                : null
                               }
                            
                        </div>
                        <div className='flex flex-col w-full pb-5'>
                            <label htmlFor="confirm_password" className='py-3'>Cofirm Password</label>
                            <input type="confirm_password" name='confirm_password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' values={values.confirm_password} onChange={handleChange} onBlur={handleBlur}/>
                            {
                                errors.confirm_password && touched.confirm_password ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.confirm_password}</p>
                                )
                                : null
                               }
                            
                        </div>
                        <button className='w-full bg-secondary py-3 px-5 text-white font-semibold' type='submit'>Reset</button>
                    </form>
                </div>
                
            </div>
        </div>
    </motion.div>
  )
}

export default ResetPassword