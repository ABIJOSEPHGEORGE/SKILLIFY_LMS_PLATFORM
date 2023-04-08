import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFormik } from 'formik'
import { loginSchema } from '../../validations/FormValidations'
import { userLogin } from '../../helpers/user/AuthHelpers'
import { ToastContainer,toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation()
    useEffect(()=>{
        if(location.state?.msg){
            toast.success(location.state?.msg)
            location.state.msg = ""
        }
    },[location.state])
    const {values,errors,touched,handleSubmit,handleBlur,handleChange} = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema:loginSchema,
        onSubmit:async (values)=>{
            userLogin(values)
            .then((res)=>{
                console.log(res)
                if(res.data.code===200){
                    //storing the jwt token in local storage
                    const token = res.data.results.token;
                    const user = JSON.stringify(token)
                    localStorage.setItem('authKey',user);
                    navigate('/',{replace:true})
                }
            })
            .catch((err)=>{
                toast.error(err.response.data.msg)
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
                    <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Hello ! Welcome back.</h2>
                    <p className=' font-medium text-primaryViolet text-sm md:text-lg'>
                        Log in with your data that you entered during Your registration.
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
                        <div className='flex flex-col w-full pb-5'>
                            <label htmlFor="password" className='py-3'>Password</label>
                            <input type="password" name='password' className='border-b-2 border-gray-200 focus:border-primary px-5 py-2 focus:outline-none' placeholder='Enter Password' values={values.password} onChange={handleChange} onBlur={handleBlur}/>
                            {
                                errors.password && touched.password ? (
                                    <p className='text-red-600 font-extralight text-md'>{errors.password}</p>
                                )
                                : null
                               }
                           <Link to="/forgot-password"><p className='text-end pt-2 text-primary cursor-pointer'>Forgot Password ?</p></Link>
                        </div>
                        <button className='w-full bg-secondary py-3 px-5 text-white font-semibold' type='submit'>Log In</button>
                    </form>
                </div>
                
            </div>
        </div>
    </motion.div>
  )
}

export default Login