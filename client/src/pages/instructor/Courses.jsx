import React from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'

function Courses() {
  return (
    <div className='flex font-poppins'>
        <SideMenu/>
        <div className='w-full px-5  h-screen mt-10 flex flex-col place-items-center'>
            <div className=" h-20 w-4/5 flex place-content-around place-items-center px-5">
                <h3 className='font-semibold text-primaryViolet text-2xl '>Have a new skill to share ?</h3>
                <Link to="/instructor/create-course" className='bg-primaryBlue px-3 py-3 text-white font-semibold text-center rounded-sm'>Create Course</Link>
            </div>
        

        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
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
               
             
                    <tr class="hover:bg-gray-50" >
                        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="px-6 py-4">
                            <p>1</p>
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{}</div>
                            <div class="text-gray-400">{}</div>
                        </div>
                        </th>
                        <td class="px-6 py-4">
                            <div className="w-40">
                                <img src="/top11.png" alt="" className='w-full h-full'/>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <p>Web Development</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>Description</p>
                        </td>
                        <td class="px-6 py-4">
                            
                            <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Active
                            </span>
                            
                           
                            
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex place-content-around">
                                <div className="flex flex-col place-items-center">
                                  <AiOutlineEdit size={25}></AiOutlineEdit>
                                  <p className="font-semibold">Edit</p>
                                </div>
                                <div className="flex flex-col place-items-center">
                                  <AiOutlineDelete size={25}></AiOutlineDelete>
                                  <p className="font-semibold">Delete</p>
                                </div>
                            </div>
                        </td>
                    </tr>
            
       
        </tbody>
        </table>
        
        </div>
        </div>
    </div>
  )
}

export default Courses