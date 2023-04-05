import React,{useState} from 'react'
import { motion } from 'framer-motion'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate,Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { ForgotPasswordSchema } from '../../validations/AuthValidations';
import axios from 'axios';
import { resendEmail } from '../../helpers/user/AuthHelpers';

function ForgotPassword() {
    const navigate = useNavigate();
    const [status,setStatus] = useState(null)
    const {values,errors,touched,handleSubmit,handleBlur,handleChange} = useFormik({
        initialValues:{
            email:'',
        },
        validationSchema:ForgotPasswordSchema,
        onSubmit:async (values)=>{
            function forgotUserPassword(){
                axios.post('/forgot-password',values)
                .then((res)=>{
                    setStatus(res.data)
                })
                .catch((err)=>{
                    toast.error(err.response.data.message)
                })
            }
            forgotUserPassword()
            
        }
    })
    const handleResend=(status)=>{
        const resendToast = toast.loading('Resending...')
        resendEmail(status.user,'reset')
        .then((res)=>{
            toast.update(resendToast,{render:res.data.msg,type:"success",isLoading:false,autoClose:5000})
            setStatus(res.data);
        })
        .catch((err)=>{
            toast.update(resendToast,{render:err.response.data.msg,type:"error",isLoading:false,autoClose:5000})
        })
    }
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
                {
                    !status ? 
                <div className='w-full lg:w-3/6'>
                    <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Forget Password ?</h2>
                    <p className=' font-medium text-primaryViolet text-sm md:text-lg'>
                        Don't worry Restart your password and continue your journey!
                    </p>
                    <form  className='flex flex-col w-full items-start' onSubmit={handleSubmit}>
                        <div className='flex flex-col w-full py-3'>
                            <label htmlFor="email" className='py-3'>Email</label>
                            <input type="email" name='email' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Email Address' values={values.email} onChange={handleChange} onBlur={handleBlur}/>
                            {
                                errors.email && touched.email ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.email}</p>
                                )
                                : null
                               }
                        </div>
                        
                        <button className='w-full bg-secondary py-3 px-5 text-white font-semibold' type='submit'>Verify Email</button>
                    </form>
                </div>
                : 
                <div className='flex flex-col place-content-center place-items-center'>
                        <img src="/gif/pending.gif" alt="email_pending" className='w-80 h-80' />
                        <h2 className='text-green-500 text-md font-poppins'>{status.msg}</h2>
                        <button className='px-4 py-3 text-white bg-primary my-3' onClick={()=>{handleResend(status)}}>Resend Link</button>
                </div>
                }
                
            </div>
        </div>
    </motion.div>
  )
}

export default ForgotPassword