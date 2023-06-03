import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify'

function AdminLogin() {
    const navigate = useNavigate()
    const {handleBlur,handleChange,touched,errors,values,handleSubmit} = useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        onSubmit:values=>{
            axios.post('/admin/login',values)
            .then((res)=>{
                if(res.status===200){
                    const token = JSON.stringify(res.data.results.token);
                    localStorage.setItem('authKey',token);
                    navigate('/admin/dashboard',{replace:true})
                }
            })
            .catch((err)=>{
                
                toast.error(err.response.data.message)
            })
        }
    })
  return (
    <div  className='flex flex-col md:flex md:flex-row w-100 h-screen font-poppins lg:overflow-y-hidden' >
        <ToastContainer position='top-center' ></ToastContainer>
        <div className=' w-100  md:w-3/6 lg:w-2/5 bg-primary flex justify-center items-center py-3 md:py-0'>
           <div className="flex-col w-100">
                <img src="/login/login-banner.png" alt="login-banner"  className='w-100 p-5'/>
                <h2 className='text-center text-white font-semibold text-xl md:text-3xl lg:text-4xl leading-8 md:leading-10 font-poppins '>Turn your ambition into a success story</h2>
                <p className=' font-medium text-white text-center py-2 text-sm md:text-lg'>Choose from over 100,000 online video.</p>
           </div>
        </div>
        <div className= 'w-full md:w-3/6 lg:w-3/5 p-3  md:p-5'>
            <div className="flex flex-col justify-center items-center h-full">
                
                <div className='w-full lg:w-3/6'>
                    <h2 className='text-black font-medium text-2xl md:text-3xl py-5'>Admin Login</h2>
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
                        </div>
                        <button className='w-full bg-darkPink py-3 px-5 text-white font-semibold' type='submit'>Log In</button>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AdminLogin