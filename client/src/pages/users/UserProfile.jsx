import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../../components/users/NavBar'
import { Input, Textarea } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import {FaRegUser} from 'react-icons/fa'
import Profile from '../../components/users/profile&settings/Profile'
import ProfileImage from '../../components/users/profile&settings/ProfileImage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { updateProfileImage } from '../../redux/profileSlice'
import { details } from '../../config'
import ResetPassword from '../../components/users/profile&settings/ResetPassword'
import Footer from '../../components/users/Footer'

function UserProfile() {
    const [state,setState] = useState('profile');
    const {profile_image} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        fetchProfileImage()
    },[])

    function fetchProfileImage(){
        axios.get('/user/account/profile-image')
        .then((res)=>{
            if(res.data.results){
                const profile_url = details.base_url+res.data.results;
                dispatch(updateProfileImage(profile_url))
            }else{
                dispatch(updateProfileImage(null))
            }
            
        })
        .catch((err)=>{
            toast.error("Something wen't wrong...")
        })
    }

    
  return (
    <div className='w-full h-full'>
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        <div className="absolute top-0 w-full h-20  flex flex-col gap-3 place-content-between ">
            <NavBar/>
        </div>
        <div className='w-full h-full flex gap-2'>
            <div className="w-1/6 h-auto min-h-screen pt-40 flex flex-col place-items-center bg-lightblue">
                <div className="avatar flex flex-col place-items-center gap-3">
                    <div className=" w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                        {
                            profile_image ?
                            <img src={profile_image} alt='profile_image'/>
                            :
                            <div className="bg-black bg-opacity-50 w-full h-full flex place-content-center place-items-center">
                                <h1 className='text-white text-center font-semibold text-4xl'>A</h1>
                            </div>
                        }
                       
                        
                    </div>
                    <h2 className='text-2xl font-semibold'>Hello Abin!</h2>
                </div>

                <div className="flex flex-col place-items-center pt-5 gap-5">
                    <div className="w-full p-3">
                        <Link className='text-lg font-normal ' onClick={()=>setState('profile')}>Account Details</Link>
                    </div>
                    <div className="w-full p-3">
                        <Link className='text-lg font-normal ' onClick={()=>setState('profile-image')}>Profile Image</Link>
                    </div>
                    <div className="w-full p-3">

                        <Link className='text-lg font-normal' onClick={()=>{setState('password-reset')}}>Password Reset</Link>
                    </div>
                </div>
            </div>
            <div className="w-full h-full pt-32 px-5 flex flex-col place-items-start">
                {
                    state === 'profile' ?
                    <Profile/>
                    : state ==="profile-image" ?
                    <ProfileImage/>
                    : state === "password-reset" ?
                    <ResetPassword/> : <Profile/>
                }
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default UserProfile