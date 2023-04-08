import React from 'react'
import {BiHomeAlt2,BiCategoryAlt,BiCategory} from 'react-icons/bi'
import {BsBook,BsBox} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'
import {SlGraduation} from 'react-icons/sl'
import {CiDiscount1,CiWallet,CiLogout} from 'react-icons/ci'
import {HiOutlineDocumentText} from 'react-icons/hi'
import { NavLink,useNavigate } from 'react-router-dom'


function SideBar() {
    const navigate = useNavigate()
    const adminLogout=()=>{
        localStorage.removeItem('authKey');
        navigate('/admin',{replace:true})
    }
  return (
    <div className='bg-white z-50 absolute xl:relative left-0 h-auto md:h-auto lg:h-auto w-2/4 md:w-2/6 lg:w-1/5 shadow-xl rounded-tr-3xl rounded-br-3xl font-poppins'>
        <div className="flex py-3">
            <img src="/avatar.png" alt="admin_profile_image" className='rounded-xl w-30 h-30' />
            <div className="flex flex-col place-content-center place-items-start">
                <h2 className='font-semibold'>Abin George</h2>
                <p className='text-gray-400 font-semibold'>Admin</p>
            </div>
        </div>
        <div className="flex flex-col py-5 mt-5">
            <NavLink to="/admin/dashboard" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiHomeAlt2 size={50} className='px-3'></BiHomeAlt2>
                <h3 className=' font-semibold '>Dashboard</h3>
            </NavLink>
            <div className="flex place-items-center h-10 my-2">
               <BsBook size={50} className='px-3 text-primaryBlue'></BsBook>
                <h3 className='font-semibold text-primaryBlue'>Courses</h3>
            </div>
            <NavLink to="/admin/students" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <AiOutlineUser size={50} className='px-3 '></AiOutlineUser>
                <h3 className='font-semibold '>Students</h3>
           </NavLink>
            <NavLink to="/admin/instructors" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <SlGraduation size={50} className='px-3'></SlGraduation>
                <h3 className='font-semibold'>Instructors</h3>
            </NavLink>
            <div className="flex place-items-center h-10 my-2">
                <CiDiscount1  size={50} className='px-3 text-primaryBlue'></CiDiscount1>
                <h3 className='font-semibold text-primaryBlue'>Coupon</h3>
            </div>
            <div className="flex place-items-center h-10 my-2">
                <CiWallet size={50} className='px-3 text-primaryBlue'></CiWallet>
                <h3 className='font-semibold text-primaryBlue'>Payments</h3>
            </div>
            <div className="flex place-items-center h-10 my-2">
                <BsBox size={50} className='px-3 text-primaryBlue'></BsBox>
                <h3 className='font-semibold text-primaryBlue'>Orders</h3>
            </div>
            <NavLink to="/admin/category" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiCategoryAlt size={50} className='px-3'></BiCategoryAlt>
                <h3 className='font-semibold'>Categories</h3>
            </NavLink>
            <NavLink to="/admin/subcategory" className={({isActive})=>(isActive ? 'bg-primaryBlue flex place-items-center text-white my-2' : 'flex place-items-center bg-white-10 my-2')}>
                <BiCategory size={50} className='px-3'></BiCategory>
                <h3 className='font-semibold'>Sub Categories</h3>
            </NavLink>
            <div className="flex place-items-center h-10 my-2">
                <HiOutlineDocumentText size={50} className='px-3'></HiOutlineDocumentText>
                <h3 className='font-semibold text-primaryBlue'>Sales Report</h3>
            </div>
            <div className="flex place-items-center h-10 my-2 cursor-pointer" onClick={()=>{adminLogout()}}>
                <CiLogout size={50} className='px-3 text-primaryBlue'></CiLogout>
                <h3 className='font-semibold text-primaryBlue'>Logout</h3>
            </div>
        </div>
    </div>
  )
}

export default SideBar