import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NavBar from '../../components/users/NavBar'
import { Input, Textarea } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import {FaRegUser} from 'react-icons/fa'
import Profile from '../../components/users/profile&settings/Profile'
import ProfileImage from '../../components/users/profile&settings/ProfileImage'

function UserProfile() {
    const [state,setState] = useState('profile')
  return (
    <div className='w-full h-full'>
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        <div className="absolute top-0 w-full h-20  flex flex-col gap-3 place-content-between ">
            <NavBar/>
        </div>
        <div className='w-full h-full flex gap-2'>
            <div className="w-1/6 h-auto min-h-screen pt-40 flex flex-col place-items-center bg-secondary">
                <div className="avatar flex flex-col place-items-center gap-3">
                    <div className=" w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                        <img src="https://www.assyst.de/cms/upload/sub/digitalisierung/18-F.jpg" alt='profile_image'/>
                        
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
                    null : null
                }
            </div>
        </div>
    </div>
  )
}

export default UserProfile