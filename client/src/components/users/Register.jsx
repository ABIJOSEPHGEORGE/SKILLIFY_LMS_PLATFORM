import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useFormik} from 'formik'
import { registerSchema } from '../../validations/FormValidations';
import { ToastContainer,toast} from 'react-toastify';
import { motion } from 'framer-motion';
import { resendEmail, userRegister } from '../../helpers/user/AuthHelpers';
import "react-toastify/dist/ReactToastify.css";




function Register() {
    const [status,setStatus] = useState(null)
    const {values,errors,touched,handleChange,handleBlur,handleSubmit} = useFormik({
        initialValues:{
            first_name:'',
            last_name:'',
            email:'',
            password:'',
            confirm_password:''
        },
        validationSchema:registerSchema,
        onSubmit:async values=>{
            const registerToast = toast.loading('Submitting...',{autoClose: 5000});
            userRegister(values)
            .then((res)=>
            {
                setStatus(res.data)
                toast.update(registerToast,{render:res.data.msg,type:"success",isLoading:false,autoClose:5000})
               
            })
            .catch((err)=>{
                
                toast.update(registerToast,{render:err.response.data.msg,type:"error",isLoading:false,autoClose:5000})
            })
            
        }
    })
    const handleResend=(status)=>{
        const resendToast = toast.loading('Resending...')
        resendEmail(status.user,'register')
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
    exit={{opacity:0,transition:{duration:0.5}}} 
    className='flex flex-col md:flex md:flex-row w-100 h-screen font-poppins lg:overflow-y-hidden'>
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
                    <p className='px-3 text-primaryViolet'>Already have an account?</p>
                    <Link to="/login"><button className='px-3 py-2 text-white bg-primary'>Login</button></Link>
                </div>
                {
                    !status ? 
                <div className='w-full lg:w-3/6'>
                    <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Create your free account.</h2>
                    <p className=' font-medium text-primaryViolet text-sm md:text-lg'>
                    See how the world’s best user experiences are created.
                    </p>
                    <form className='flex flex-col w-full items-start' onSubmit={handleSubmit}>
                        <div className='flex w-full py-3 justify-between'>
                            <div className="flex  flex-col w-3/6 px-1">
                                <label htmlFor="first_name" className='py-3'>First Name</label>
                                <input type="first_name" name='first_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter First Name' values={values.first_name} onBlur={handleBlur} onChange={handleChange} />
                               {
                                errors.first_name && touched.first_name ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.first_name}</p>
                                )
                                : null
                               }
                               
                            </div>
                            <div className="flex flex-col w-3/6 px-1">
                                <label htmlFor="last_name" className='py-3'>Last Name</label>
                                <input type="last_name" name='last_name' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Last Name' values={values.last_name} onBlur={handleBlur} onChange={handleChange} />
                                {
                                errors.last_name && touched.last_name ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.last_name}</p>
                                )
                                : null
                               }
                            </div>
                            
                        </div>
                        <div className='flex flex-col w-full pb-5'>
                            <label htmlFor="email" className='py-3'>Email</label>
                            <input type="email" name='email' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Email Address' values={values.email} onBlur={handleBlur} onChange={handleChange}/>
                            {
                                errors.email && touched.email ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.email}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='flex flex-col w-full pb-5'>
                            <label htmlFor="password" className='py-3'>Password</label>
                            <input type="password" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' values={values.password} onBlur={handleBlur} onChange={handleChange} />
                            {
                                errors.password && touched.password ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.password}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='flex flex-col w-full pb-5'>
                            <label htmlFor="confirm_password" className='py-3'>Confirm Password</label>
                            <input type="confirm_password" name='confirm_password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Confirm Password' values={values.confirm_password} onBlur={handleBlur} onChange={handleChange} />
                            {
                                errors.confirm_password && touched.confirm_password ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.confirm_password}</p>
                                )
                                : null
                               }
                        </div>
                        <button className='w-full bg-primary py-3 px-5 text-white font-semibold' type='submit'>Register</button>
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

export default Register