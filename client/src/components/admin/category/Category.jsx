import React, { useEffect, useState } from 'react'
import AddCategory from './AddCategory'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { updateCategory,togglePopup, editCategory} from '../../../redux/admin';
import {toast,ToastContainer} from 'react-toastify'
import {CiEdit} from 'react-icons/ci'
import {MdDeleteOutline} from 'react-icons/md'
import EditCategory from './EditCategory';
import { details } from '../../../config';


function Category() {
    const dispatch = useDispatch();
    const {categories,popup} = useSelector((state)=>state.admin)
    const [toggle,setToggle] = useState({add:false,edit:false});
    useEffect(()=>{
        allCategory()
    },[toggle,dispatch])
    function allCategory(){
        axios.get('/admin/categories')
        .then(({data})=>{
            dispatch(updateCategory(data.results.categories))
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    function updateStatus(id,status){
        axios.put(`/admin/category/status/${id}?status=${status}`)
        .then((res)=>{
            allCategory()
        })
        .catch((err)=>{
          toast.error(err.response.data.message)
        })
    }
    function deleteCategory(data){
        axios.delete(`/admin/category/${data.id}`)
        .then((res)=>{
            toast.success('Category deleted successfully');
            allCategory()
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
        dispatch(togglePopup(false))
    }
    function handleEditCategory(id){
        axios.get(`/admin/category/${id}`)
        .then((res)=>{
            dispatch(editCategory(res.data.results.data));
            setToggle({edit:true})
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
  return (
    <div className="w-full p-5 h-full flex flex-col place-items-center">
        <ToastContainer position='top-center'></ToastContainer>
    <div className='px-5 w-full h-full  py-10 font-poppins flex flex-col place-content-start bg-white shadow-xl rounded-xl'>
        <div className="w-full px-5 flex place-items-center ">
            <div className='flex place-content-between place-items-center w-full h-14'>
                <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Category Management</h2>
                <button className='bg-primaryBlue round-md text-center px-5 py-2 text-white text-light' onClick={()=>setToggle({add:true})}>Create Category</button>
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
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">List / Unlinst</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Edit</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Delete</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
               {
                categories.map((category,index)=>(
                    <tr class="hover:bg-gray-50" key={index}>
                        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="px-6 py-4">
                            <p>{index+1}</p>
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{}</div>
                            <div class="text-gray-400">{}</div>
                        </div>
                        </th>
                        <td class="w-full h-full md:w-1/5">
                            <img className='w-full h-full m-1' src={`${details.base_url}/${category.category_image}`} alt={category.category_name} />
                        </td>
                        <td class="px-6 py-4">
                            <p className='text-lg text-semibold text-black first-letter:capitalize'>{category.category_name.split("-").join(" ")}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p>{category.category_description}</p>
                        </td>
                        <td class="px-6 py-4">
                            {
                                !category.status ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Listed
                                </span>
                                :
                                <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                    Unlisted
                                </span>
                            }   
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={!category.status}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => category.status ? updateStatus(category._id,'false'):updateStatus(category._id,'true')}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                        {
                                            category.status ?
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                List
                                            </span>
                                            :
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                UnList
                                            </span>
                                        }
                                   
                                </label>
                                
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer"
                            onClick={()=>{handleEditCategory(category._id)}}
                            >
                                <CiEdit size={25}></CiEdit>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer"
                            onClick={()=>{dispatch(togglePopup({id:category._id}))}}
                            >
                                <MdDeleteOutline size={25} className='text-red-500'></MdDeleteOutline>
                            </div>
                        </td>
                </tr>
                ))
               }
        </tbody>
        </table>
        
        </div>
                      {
                        popup ? 
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                                <div
                                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                                    onClick={()=>{dispatch(togglePopup(false))}}
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
                                                        {deleteCategory(popup)}}
                                                    
                                                    >
                                                        Delete
                                                    </button>
                                                    
                                                        
                                                    <button
                                                        className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                        onClick={() =>
                                                            
                                                        {dispatch(togglePopup(false))}}
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
                    
                    {
                        toggle.add ? <AddCategory setToggle={setToggle}/> : toggle.edit ? <EditCategory setToggle={setToggle} allCategory={allCategory}/> : null
                    }
                   
           
        
    </div>
            
    </div>
  )
}

export default Category