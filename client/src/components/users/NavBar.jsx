import React,{useEffect, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import {BsCart3} from 'react-icons/bs'
import { Link, useNavigate,useSearchParams } from 'react-router-dom'

import {BsChevronDown} from 'react-icons/bs'
import { allCategories } from '../../redux/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchKey } from '../../redux/courseListing'
import { userToken } from '../../helpers/user/AuthHelpers'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { toast } from 'react-toastify'
import { details } from '../../config'


function NavBar() {
  const [key,setKey] = useState("")
  const dispatch = useDispatch()
  const {searchKey} = useSelector((state)=>state.courseList)
  const [searchParams,setSearchParams] = useSearchParams()
  const searchInput = searchParams.get("key")
  const [search,setSearch] = useState("")
  const [user,setUser] = useState(null)


  useEffect(()=>{
    if(search===""&&searchInput){
      setSearch(searchInput)
    }
  },[]) 

  function searchCourse(e){
    if(e.key === "Enter"){
      navigate(`/courses?key=${search}`)
    }
  }

  const token = userToken()
  let decode;
  if(token){
    decode = jwt_decode(token)
  }

 
    function fetchUser(){
      axios.get('/user/account/userinfo')
      .then((res)=>{
        setUser(res.data.results)
      })
      .catch((err)=>{
        toast.error("Something wen't wrong...")
      })
    }
    
    useEffect(()=>{
      fetchUser()
    },[token])

  const navigate = useNavigate()
    const handleLogout = (e)=>{
        localStorage.removeItem('authKey');
        navigate('/login',{replace:true})
    }


  return (
    <div className='w-100 h-20 flex font-poppins px-5 p-4 place-items-center place-content-center gap-5'>
      <div className="flex flex-1 place-items-center place-content-start gap-12">
          <h1 className='font-semibold text-2xl text-black'>Skillify</h1>
          <div className="flex px-10 rounded-3xl border-2 border-gray-800 py-2 place-items-center ms-3">
            <AiOutlineSearch size={20}></AiOutlineSearch>
            <input type="text" className='focus:outline-none ms-2 bg-transparent placeholder:text-black' value={search} placeholder='search for courses' onChange={(e)=>setSearch(e.target.value)} onKeyPress={(e)=>{searchCourse(e)}}/>
          </div>
      </div>
      
          <div className='flex gap-3 place-items-center'>
        
            <Link to="/"><li className='px-1 list-none'>Home</li></Link>
            <Link to="/courses"><li className='px-1 list-none'>Courses</li></Link>
            <Link to="/user/cart"><BsCart3 className=" cursor-pointer"></BsCart3></Link>
            {
              decode ?
              <div className="flex flex-1 px-3 place-content-evenly place-items-center gap-3">
        
                {
                  decode?.role === 'instructor' ? 
                  <Link to="/instructor/dashboard"><li className='px-1 list-none'>Instructor</li></Link>
                  :
                  <Link to="/instructor/onboarding"><li className='px-1 list-none'>Become an Instructor</li></Link>
                }
                
          
              
              <Link to="/user/my-learning" className='px-1 list-none'>My Learning</Link>
              <li className='px-1 list-none cursor-pointer' onClick={(e)=>{handleLogout(e)}}>Logout</li>
              <Link to="/user/profile" className='w-12 h-12  rounded-3xl bg-lightPink flex place-content-center place-items-center cursor-pointer'>
                <h2 className='text-black font-bold text-2xl uppercase'>{user?.first_name?.split("")[0]}</h2>
              </Link>
            </div>  
              :
              <div className='flex gap-2'>
              <button className='px-4 py-2 bg-darkPink mx-2 text-white' onClick={()=>{navigate('/login')}}>Login</button>
              <button className='px-4 py-2 bg-primaryBlue text-white mx-2' onClick={()=>{navigate('/register')}}>Sign up</button>
            </div>
            }
        
              
        </div>
          

          
      </div>
  )
}

export default NavBar