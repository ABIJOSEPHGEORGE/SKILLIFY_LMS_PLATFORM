import React,{useEffect,useState} from 'react'
import {  useNavigate, useSearchParams } from 'react-router-dom'
import { emailVerification } from '../../helpers/user/AuthHelpers';
import { motion } from 'framer-motion';
import ResetPassword from './ResetPassword';
import axios from 'axios';

function VerifyResetPassword() {
    const navigate = useNavigate()
    const [status,setStatus] = useState('Pending');
    const [msg,setMsg] = useState('')
    const [queryParameters] = useSearchParams();
    const data = {
        user : queryParameters.get('id'),
        token : queryParameters.get('token')
    }
    useEffect(()=>{
        axios.post('/verify-reset-email',data)
        .then((res)=>{
            
            if(res.status===200){
               navigate('/reset-password',{state:{user:data.user},replace:true})
            }
        })
        .catch((err)=>{
            
            setStatus('Failed')
            setMsg(err.data.msg);
        })
    },[])
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
            : 
            <div className='flex flex-col place-content-center place-items-center'>
                <img src="/gif/failed.gif" alt="email_failed" className='w-80 h-80' />
                <h2 className='text-red-500 text-xl font-poppins font-medium'>{msg}</h2>
            </div>
        }
    </motion.div>
  )
}

export default VerifyResetPassword