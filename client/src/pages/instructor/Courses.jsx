import React,{useEffect, useState} from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {details} from '../../config'


function Courses() {
    const [courses,setCourses] = useState([])
    const [toggle,setToggle] = useState(false)
    useEffect(()=>{
        fetchCourses()
    },[])
    
    function fetchCourses(){
        axios.get('/instructor/course/')
        .then((res)=>{
            setCourses(res.data.results);
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    function handleDeleteCourse(){
        axios.delete(`/instructor/course/${toggle}`)
        .then((res)=>{
            setToggle(false);
            fetchCourses()
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }

    console.log(courses)
  return (
    <div className='flex font-poppins'>
        <SideMenu/>
        <div className='w-full px-5  h-screen mt-10 flex flex-col place-items-center'>
            <div className=" h-20 w-4/5 flex place-content-around place-items-center px-5">
                <h3 className='font-semibold text-primaryViolet text-2xl '>Have a new skill to share ?</h3>
                <Link to="/instructor/create-course" className='bg-primaryBlue px-3 py-3 text-white font-semibold text-center rounded-sm'>Create Course</Link>
            </div>
        

        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead class="bg-gray-50">
            <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">SI No.</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Course Image</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Course Title</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
               {
                courses.map((course,index)=>(
                    <tr class="hover:bg-gray-50" >
                        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="px-6 py-4">
                            <p>{index+1}</p>
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{}</div>
                            <div class="text-gray-400">{}</div>
                        </div>
                        </th>
                        <td class="px-6 py-4">
                            <div className="w-40">
                                <img src={details.base_url+course.course_image} alt="course_image" className='w-full h-full'/>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <p>{course.course_title}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>{course.course_description}</p>
                        </td>
                        <td class="px-6 py-4">
                            {
                                course.status ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Active
                                </span>
                                :
                                <span class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                    Pending
                                 </span>
                            }  
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex place-content-around gap-5">
                                <div className="flex flex-col place-items-center cursor-pointer">
                                <AiOutlineEdit size={25}></AiOutlineEdit>
                                <p className="font-semibold ">Edit</p>
                                </div>
                                <div className="flex flex-col place-items-center cursor-pointer" onClick={()=>{setToggle(course._id)}}>
                                <AiOutlineDelete size={25} className="text-red-300"></AiOutlineDelete>
                                <p className="font-semibold text-red-500">Delete</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))
               }
             
                    
            
       
        </tbody>
        </table>
        
        </div>
        </div>
        
        {
                        toggle ? 
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                                <div
                                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                                    onClick={()=>{setToggle(false)}}
                                ></div>
                                <div className="flex items-center min-h-screen px-4 py-8">
                                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                        <div className="mt-3 sm:flex place-content-center">
                                            
                                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                        
                                                <h4 className="text-lg font-medium text-gray-800">
                                                    Are you sure you want to Delete ?
                                                </h4>
                                                
                                               
                                                
                                                <div className="items-center gap-2 mt-3 sm:flex">
                                                    
                                                        
                                                        <button
                                                        className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                        onClick={() =>
                                                        {handleDeleteCourse()}}
                                                    
                                                    >
                                                        Delete
                                                    </button>
                                                    
                                                        
                                                    <button
                                                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                        onClick={() =>
                                                            
                                                        {setToggle(false)}}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                        null
                      }
    </div>
  )
}

export default Courses