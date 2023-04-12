import React,{useEffect, useState} from 'react'
import { useFormik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OnboardingFormOne from './OnboardingFormOne';
import OnboardingFormTwo from './OnboardingFormTwo';
import axios from 'axios';
import {tokenAuthentication,userToken } from '../../helpers/user/AuthHelpers';


function OnboardingForm() {
    const [activeStep,setActiveStep] = useState(1);
    const navigate = useNavigate();
    const token = userToken()
    useEffect(()=>{
        (async function() {
            const res = await tokenAuthentication()
            if(res.role==='instructor'){
                navigate('/instructor/dashboard',{replace:true})
            }
        })(); 
    })
    const formik = useFormik({
        initialValues:{
            experience_mode:'',
            experience_years :''
        },
        onSubmit:values=>{
            axios.post('/instructor/signup',{headers:token},values)
                .then(({data})=>{
                    if(data.code===200){
                        const token = JSON.stringify(data.results.token)
                        localStorage.setItem('authKey',token);
                        navigate('/instructor/dashboard',{replace:true})
                    }else if(data.code===403){
                        navigate('/login',{replace:true})
                    }
                })
                .catch((err)=>{
                    navigate('/',{replace:true})
                })
          
        }
    })
    function handleBack(){
        setActiveStep((prev)=>prev-1)
    }
    function handleNext(){
        setActiveStep((prev)=>prev+1)
    }
    const formContent = (step)=>{
        switch(step){
            case 1:
                return <OnboardingFormOne formik={formik}/>;
            case 2 :
                return <OnboardingFormTwo formik={formik}/>
            default:
                return <Navigate to="/"/>
        }
    }
  return (
    <motion.div className='w-100 h-screen flex font-poppins'
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
    >
        <div className="w-2/5 p-2 bg-primaryViolet flex flex-col place-content-center place-items-center">
            <h2 className='text-white font-bold text-3xl'>Share your knowledge</h2>
            <img src="/instructor/onboarding-image.png" alt="onboarding_image" className='w-4/5'/>
        </div>
        <div className="p-3 flex flex-col place-content-start place-items-start w-3/5 h-screen">
            <div className="w-full px-5 flex place-content-end place-items-center">
                <Link to="/"><h3 className='text-end text-primaryViolet font-semibold'>Cancel</h3></Link>
            </div>
            <div className="flex flex-col place-content-center place-items-start px-32 h-full w-full">
                {formContent(activeStep)}
                <div className='w-full flex place-content-center'>
                    <div className={activeStep>1 ? "flex place-content-between w-full" : "flex place-content-end w-full"}>
                        {activeStep>1 ? 
                            <button className='bg-black px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleBack}>Back</button>
                            : null
                        }

                        {activeStep!==2 ? <button className='bg-black px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleNext}>Next</button>
                        :
                        <button type='button' className='bg-black px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={formik.handleSubmit}>Submit</button>
                        }
                        
                    </div>
                       
                </div>
            </div>
        </div>
    </motion.div>
  )
}

export default OnboardingForm