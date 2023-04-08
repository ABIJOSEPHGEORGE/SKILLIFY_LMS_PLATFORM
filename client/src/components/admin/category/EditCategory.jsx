import React, { useState } from 'react'
import { useFormik } from 'formik'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {categorySchema, imageValidation} from '../../../validations/FormValidations'
import {useSelector,useDispatch} from 'react-redux'
import { updateError } from '../../../redux/admin'
import {toast,ToastContainer} from 'react-toastify'
import { details } from '../../../config'
import axios from 'axios'



function EditCategory(props) {
    const {error,singleCategory} = useSelector((state)=>state.admin);
    const dispatch = useDispatch();
    const [image,setImage] = useState(null);
    const [change,setChange] = useState(false);
    const imageURL = details.base_url+singleCategory.category_image;
    const formik = useFormik({
        initialValues:{
            category_name : singleCategory.category_name,
            category_description : singleCategory.category_description,
            category_image:image
        },
        enableReinitialize:true,
        validationSchema:categorySchema,
        onSubmit:values=>{
            console.log(values)
            const form = new FormData()
            form.append('category_name',values.category_name);
            form.append('category_description',values.category_description);
            if(image){
                form.append('category_image',image);
            }else if(change && !image){
               return dispatch(updateError('Category Image is required'))
            }else{
                form.append('category_image',singleCategory.category_image)
            }
            axios.put(`/admin/category/${singleCategory._id}`,form)
            .then((res)=>{
                props.allCategory()
                props.setToggle({edit:false})
            })
            .catch(({response})=>{
                toast.error(response.data.message)
            })
        }
    })
    
    function handleImage(e){
        
        const res = imageValidation(e.target.files[0])
        
        if(res.valid===false){
            dispatch(updateError(res.reason))
            setImage(null)
        }else{
            setImage(e.target.files[0]);
            setChange(false)
            dispatch(updateError(null))
            return true;
        }
    }
  return (
    <div className='p-3 absolute z-50'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
         <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Edit Category</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => props.setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <form className="font-poppins w-full h-full flex flex-col place-content-around" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="category_name" className="text-primaryBlue font-semibold text-lg ppy-2">Category Name</label>
                            <input type="text" name="category_name" defaultValue={singleCategory.category_name} value={formik.category_name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.category_name && formik.touched.category_name ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.category_name}</p>
                                )
                                : null
                               }
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <label htmlFor="category_description" className="text-primaryBlue font-semibold text-lg py-2">Category Description</label>
                            <textarea name="category_description" defaultValue={singleCategory.category_description} value={formik.category_description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                            {
                                formik.errors.category_description && formik.touched.category_description ? (
                                    <p className='text-red-600 font-light text-sm'>{formik.errors.category_description}</p>
                                )
                                : null
                               }
                        </div>
                        <div  className='w-full flex flex-col place-items-start place-content-center px-3 py-2'>
                            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl py-2">Category Image</label>
                            {!change?
                            <>
                            <div className='w-full flex place-content-end place-items-end cursor-pointer' 
                                onClick={()=>{setChange(true)}}
                            >
                               <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
                            </div>
                            <img src={!image ? imageURL : URL.createObjectURL(image)} alt="image_preview" className="border-2 border-gray-100 p-5 my-5"/>
                            </>
                            :
                            <input name='category_image'
                            class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                            id="formFileLg"
                            type="file"
                           
                            onChange={(e)=>{handleImage(e)}}
                          
                            />
                            }
                            {error?
                                <p className='text-red-600 font-light text-sm'>{error}</p>
                                :null
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

export default EditCategory