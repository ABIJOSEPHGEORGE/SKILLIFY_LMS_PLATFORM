import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { updateCategory,togglePopup, editCategory} from '../../../redux/admin';
import {toast,ToastContainer} from 'react-toastify'
import {CiEdit} from 'react-icons/ci'
import {MdDeleteOutline} from 'react-icons/md'
import AddSubCategory from './AddSubCategory';
import EditSubCategory from './EditSubCategory';
import { editSubcategory, fetchSubcategories } from '../../../redux/categorySlice';


function SubCategory() {
    const dispatch = useDispatch();
    const {subcategories} = useSelector((state)=>state.category)
    const {categories,popup} = useSelector((state)=>state.admin)
    const [toggle,setToggle] = useState({add:false,edit:false});
    console.log(subcategories)
    useEffect(()=>{
        dispatch(fetchSubcategories());
    },[dispatch,toggle])
    function deleteSubcategory(data){
        axios.delete(`/admin/subcategory/${data.parId}/${data.subId}`)
        .then((res)=>{
            toast.success('Subcategory deleted successfully');
            dispatch(fetchSubcategories())
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
        dispatch(togglePopup(false))
    }
    function handleEditCategory(subcategory,parent){
        axios.get(`/admin/subcategory/${parent}/${subcategory}`)
        .then((res)=>{
            dispatch(editSubcategory(res.data.results.subcategory));
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
                <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Subcategory Management</h2>
                <button className='bg-primaryBlue round-md text-center px-5 py-2 text-white text-light' onClick={()=>setToggle({add:true})}>Create Subcategory</button>
            </div>
        </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">SI No.</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Subcategory Name</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Description</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Parent Category</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Edit</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Delete</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
               {
                subcategories.map((subcategory,index)=>(
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
                        <td class="px-6 py-4">
                            <p className='text-lg text-semibold text-black first-letter:capitalize'>{subcategory.sub_category_name.split("-").join(" ")}</p>
                        </td>
                        <td class="px-6 py-4">
                            <p className="text-black">{subcategory.sub_category_description}</p>
                        </td>
                        
                        <td class="px-6 py-4">
                        <p className=' first-letter:capitalize text-black'>{subcategory.parent_category_name.split("-").join(" ")}</p>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer"
                            onClick={()=>{handleEditCategory(subcategory.sub_category_id,subcategory.parent_category_id)}}
                            >
                                <CiEdit size={25}></CiEdit>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex flex-col place-items-center rounded-2xl shadow-md shadow-gray-100 p-2 cursor-pointer"
                            onClick={()=>{dispatch(togglePopup({subId:subcategory.sub_category_id,parId:subcategory.parent_category_id}))}}
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
                                                        {deleteSubcategory(popup)}}
                                                    
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
                        toggle.add ? <AddSubCategory setToggle={setToggle}/> : toggle.edit ? <EditSubCategory setToggle={setToggle}/> : null
                    }
                   
           
        
    </div>
            
    </div>
  )
}

export default SubCategory