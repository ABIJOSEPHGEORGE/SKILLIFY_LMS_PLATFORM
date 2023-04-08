import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {categorySchema, imageValidation, subcategorySchema} from '../../../validations/FormValidations'
import {useSelector,useDispatch} from 'react-redux'
import { updateError } from '../../../redux/admin'
import {toast,ToastContainer} from 'react-toastify'
import { Input,Textarea } from '@material-tailwind/react'
import { allCategories } from '../../../redux/categorySlice'
import axios from 'axios'


function EditSubCategory(props) {
    const dispatch = useDispatch();
    const {subcategory,categories} = useSelector((state)=>state.category);
    const subcat = subcategory.sub_category[0];
    useEffect(()=>{
        dispatch(allCategories())
    },[dispatch])

    const formik = useFormik({
        initialValues:{
            sub_category_name :subcat.sub_category_name ,
            sub_category_description :subcat.sub_category_description ,
            parent_category:subcategory.category_name,
        },
        enableReinitialize:true,
        validationSchema:subcategorySchema,
        onSubmit:values=>{
            axios.put(`/admin/subcategory/${subcat._id}`,values)
            .then((res)=>{
                toast.success('Subcategory updated successfully')
                props.setToggle(false)
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
    })
    
  return (
    <div className='p-3 absolute z-50'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
         <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Edit Subcategory</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => props.setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around gap-6" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <Input name='sub_category_name' variant='static' label='Subcategory name' defaultValue={subcat.sub_category_name.split("-").join(" ")} value={formik.category_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                                {
                                formik.errors.sub_category_name && formik.touched.sub_category_name ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.sub_category_name}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <Textarea name="sub_category_description" variant='static' label='Subcategory description' defaultValue={subcat.sub_category_description} value={formik.category_description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.sub_category_description && formik.touched.sub_category_description ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.sub_category_description}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <label for="parent_category" className="text-sm font-normal text-gray-600">Choose a category</label>
                            <select name='parent_category' id="parent_category" onChange={formik.handleChange} value={formik.parent_category} onBlur={formik.handleBlur}  class=" first-letter:capitalize block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-blue-500 peer">
                                        <option selected>Select</option>
                                {
                                        categories.map((category,index)=>(
                                            subcategory.category_name === category.category_name ?
                                            <option selected value={category._id} key={index} className=' first-letter:uppercase'>{category.category_name.split("-").join(" ")}</option>
                                            :
                                            <option value={category.category_name} key={index} className=' first-letter:uppercase'>{category.category_name.split("-").join(" ")}</option>
                                        ))
                                    }
                            </select>
                            
                            {
                                formik.errors.parent_category && formik.touched.parent_category ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.parent_category}</p>
                                )
                                : null
                            }
                        </div>
                        
                        <div className='py-2 px-3 flex place-content-end w-full'>
                            <button type='submit' className='text-white text-center font-semibold px-4 py-2 bg-primaryBlue rounded-sm w-2/5'>Update</button>
                        </div>
                       
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditSubCategory