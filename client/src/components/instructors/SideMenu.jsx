import React from 'react'
import {BiHomeAlt2} from 'react-icons/bi'
import {BsBook,BsBox,BsPatchQuestion} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'
import {CiWallet,CiLogout} from 'react-icons/ci'
import { NavLink} from 'react-router-dom'
import {MdOutlineAssignment}  from 'react-icons/md'
import {GrAnnounce} from 'react-icons/gr';
import {TbStars} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'


function SideMenu() {
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('authKey');
        navigate('/login',{replace:true})
    }

  return (
    <div className='bg-white w-1/6 h-auto shadow-xl rounded-tr-3xl rounded-br-3xl font-poppins'>
        <div className="flex py-3">
            <img src="/avatar.png" alt="admin_profile_image" className='rounded-xl w-30 h-30' />
            <div className="flex flex-col place-content-center place-items-start">
                <h2 className='font-semibold'>Abin George</h2>
                <p className='text-gray-400 font-semibold'>Instructor</p>
            </div>
        </div>
        <div className="flex flex-col py-5 mt-5">
            <NavLink to="/instructor/dashboard" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            <NavLink to="/instructor/courses" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BsBook size={50} className='px-3'></BsBook>
                <h3 className=' font-semibold '>Courses</h3>
            </NavLink>
            <NavLink to="/instructor/students" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <AiOutlineUser size={50} className='px-3'></AiOutlineUser>
                <h3 className=' font-semibold '>Students</h3>
            </NavLink>
            <NavLink to="/instructor/assignments" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <MdOutlineAssignment  size={50} className='px-3'></MdOutlineAssignment>
                <h3 className=' font-semibold '>Assignments</h3>
            </NavLink>
            <NavLink to="/instructor/announcements" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <GrAnnounce size={50} className='px-3'></GrAnnounce>
                <h3 className=' font-semibold '>Announcements</h3>
            </NavLink>
            <NavLink to="/instructor/payments" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <CiWallet size={50} className='px-3'></CiWallet>
                <h3 className=' font-semibold '>Payments</h3>
            </NavLink>
            <NavLink to="/instructor/announcements" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BsBox size={50} className='px-3'></BsBox>
                <h3 className=' font-semibold '>Orders</h3>
            </NavLink>
            <NavLink to="/instructor/qanda" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BsPatchQuestion size={50} className='px-3'></BsPatchQuestion>
                <h3 className=' font-semibold '>Q&A</h3>
            </NavLink>
            <NavLink to="/instructor/reviews" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <TbStars size={50} className='px-3'></TbStars>
                <h3 className=' font-semibold '>Reviews</h3>
            </NavLink>
            <NavLink onClick={handleLogout} className= 'flex place-items-center bg-white-10 my-2'>
                <CiLogout size={50} className='px-3'></CiLogout>
                <h3 className=' font-semibold '>Logout</h3>
            </NavLink>
        </div>
    </div>
  )
}

export default SideMenu