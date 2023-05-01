import React from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import SideBar from '../../components/admin/SideBar'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { details } from '../../config'
import { ToastContainer } from 'react-toastify'

function InstructorDashboard() {
  console.log("dashboard")
  return (
    <div className='flex'>
        <SideMenu/>
        <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className=" h-20 w-full flex place-content-start place-items-center px-5">
                <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Dashboard</h3>
            </div>
        

        <div class="overflow-hidden rounded-lg  shadow-md m-5 w-full">
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        
        
        </div>
        </div>
    </div>
  )
}

export default InstructorDashboard