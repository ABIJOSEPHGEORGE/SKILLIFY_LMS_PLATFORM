import React, { useState } from 'react'
import AddCategory from './AddCategory'

function Category() {
    const [toggle,setToggle] = useState()
  return (
    <div className='px-5 w-full  py-10 font-poppins flex flex-col place-content-start'>
        <div className="w-full flex place-items-center">
            <div className='flex place-content-around place-items-center w-3/5 h-20'>
                <h1 className='text-xl font-semibold text-primaryBlue '>Have a new category ?</h1>
                <button className='bg-primaryBlue round-md text-center px-5 py-2 text-white text-light' onClick={()=>setToggle(true)}>Create Category</button>
            </div>
        </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">SI No.</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category Image</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category Name</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Action</th>
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
                            <p>image</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>category name</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>Description</p>
                        </td>
                        <td class="px-6 py-4">
                            
                            <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Active
                            </span>
                            
                            <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                    Blocked
                            </span>
                            
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked=""
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                           
                                        }}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                    
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            List
                                        </span>
                                        
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            UnList
                                        </span>
                                 
                                    
                                </label>
                            </div>
                        </td>
                    </tr>
            
       
        </tbody>
        </table>
        
        </div>
        
{/*                 
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setToggle(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex place-content-center">
                                    
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                   
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Are you sure you want to block ?
                                        </h4>
                                        
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Are you sure you want to Unblock ?
                                        </h4>
                                
                                        
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            
                                                
                                                <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                   {}}
                                              
                                            >
                                                Block
                                            </button>
                                            :
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                                                onClick={() =>
                                                 
                                               {} }
                                            >
                                                unblock
                                            </button>
                                                
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    
                                                {}}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                    {/* 
                        add category
                    */}
                    {
                        toggle ? <AddCategory setToggle={setToggle}/> : null
                    }
                   
           
        
    </div>
  )
}

export default Category