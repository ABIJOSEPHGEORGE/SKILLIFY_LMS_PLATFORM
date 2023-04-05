import React,{useEffect,useState} from 'react'
import {  useSearchParams,Link } from 'react-router-dom'
import { emailVerification } from '../../helpers/user/AuthHelpers';
import { motion } from 'framer-motion';

function VerifyEmail() {
    const [msg,setMsg] = useState('');
    const [status,setStatus] = useState('Pending');
    const [user,setUser] = useState('');
    const [queryParameters] = useSearchParams();
    const data = {
        user : queryParameters.get('id'),
        token : queryParameters.get('token')
    }
    useEffect(()=>{
        emailVerification(data)
        .then((res)=>{
            setUser(res.data.user);
            setMsg(res.data.msg);
            setStatus('Success');
        })
        .catch((err)=>{
            setUser(err.data.user);
            setMsg(err.data.msg);
            setStatus('Failed')
        })
    })
  return (
    <motion.div
        initial = {{opacity:0}} 
        animate = {{opacity:1}} 
        exit = {{opacity:0}}
        className="flex flex-col place-content-center place-items-center h-screen w-100 font-poppins"
    >
        {
            status === "Pending" ? 
            <div className='flex flex-col place-content-center place-items-center'>
                <img src="/gif/pending.gif" alt="email_pending"  className='w-80 h-80' />
               <h2 className='text-orange-500 text-xl font-poppins font-medium'>Please wait, We are verifying your email</h2>
            </div>
             : status === "Success" ? 
            <div className='flex flex-col place-content-center place-items-center'>
                <img src="/gif/verified.gif" alt="email_verified"  className='w-80 h-80' />
               <h2 className='text-green-500 text-xl font-poppins font-medium'>{user ? `Hello ${user} ! ${msg}`  : msg }</h2>
               <Link to="/login"><button className='px-5 py-3 bg-primary text-white text-center my-5'>Go to Login</button></Link>
            </div>
            : 
            <div className='flex flex-col place-content-center place-items-center'>
                <img src="/gif/failed.gif" alt="email_failed" className='w-80 h-80' />
                <h2 className='text-red-500 text-xl font-poppins font-medium'>Invalid verification link , Try again...</h2>
            </div>
        }
    </motion.div>
  )
}

export default VerifyEmail