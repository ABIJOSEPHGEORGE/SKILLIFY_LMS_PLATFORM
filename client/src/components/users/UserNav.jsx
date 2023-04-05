import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsCart3} from 'react-icons/bs'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function UserNav({role}) {
    const navigate = useNavigate()
    const handleLogout = (e)=>{
        localStorage.removeItem('authKey');
        navigate('/login',{replace:true})
    }
  return (
    <div className='w-100 h-20 flex font-poppins px-5 p-4 place-items-center'>
    <div className="flex flex-1 place-items-center place-content-evenly">
        <h1 className='font-semibold text-2xl text-black'>Skillify</h1>
        <div className="flex px-10 rounded-3xl border-2 border-gray-200 py-2 place-items-center ms-3">
          <AiOutlineSearch size={20}></AiOutlineSearch>
          <input type="text" className='focus:outline-none ms-2 bg-transparent' placeholder='search for courses'/>
        </div>
    </div>
    <div className="flex flex-1 px-3 place-content-evenly place-items-center ">
        
          <li className='px-1 list-none'>Home</li>
          <li className='px-1 list-none'>Categories</li>
          {
            role === 'instructor' ? 
            <Link to="/instructor/dashboard"><li className='px-1 list-none'>Instructor</li></Link>
            :
            <Link to="/user/instructor/onboarding"><li className='px-1 list-none'>Become an Instructor</li></Link>
          }
          
          
        <BsCart3></BsCart3>
        <li className='px-1 list-none'>My Learning</li>
        <li className='px-1 list-none cursor-pointer' onClick={(e)=>{handleLogout(e)}}>Logout</li>
        <div className='w-12 h-12 px-3 py-3 rounded-3xl bg-lightPink flex place-content-center place-items-center'>
            <h2 className='text-black font-bold text-2xl uppercase'>A</h2>
        </div>
    </div>
  </div>
  )
}

export default UserNav