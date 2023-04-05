import React from 'react'
import { useFormik } from 'formik'
import {AiOutlineCloseCircle} from 'react-icons/ai'


function AddCategory(props) {
    console.log(props)
    const formik = useFormik({
        initialValues:{

        }
    })
  return (
    <div className='p-3'>
         <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <h2 className='text-center font-semibold text-2xl text-primaryBlue'>Create Category</h2>
                    <AiOutlineCloseCircle size={20} className="absolute top-0 right-0 m-2 cursor-pointer" onClick={() => props.setToggle(false)}></AiOutlineCloseCircle>
                    <div className="mt-3 sm:flex place-content-center">
                    <div className="font-poppins w-full h-full flex flex-col place-content-around">
                        <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                            <label htmlFor="category_name" className="text-primaryBlue font-semibold text-lg ppy-2">Category Name</label>
                            <input type="text" name="category_name" value={formik.category_name} onChange={formik.handleChange} placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                        </div>
                        <div className='w-full flex flex-col place-items-start place-content-center'>
                            <label htmlFor="category_description" className="text-primaryBlue font-semibold text-lg py-2">Category Description</label>
                            <textarea name="category_description" value={formik.category_description} onChange={formik.handleChange} placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                        </div>
                        <div  className='w-full flex flex-col place-items-start place-content-center px-3 py-2'>
                            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl py-2">Category Image</label>
                            <img src="/instructor/image-placeholder.png" alt="image_preview" className="border-2 border-gray-100 p-5 my-5"/>
                            <input
                            class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                            id="formFileLg"
                            type="file" />
                        </div>
                        <div className='py-2 px-3 flex place-content-end w-full'>
                            <button className='text-white text-center font-semibold px-4 py-2 bg-primaryBlue rounded-sm w-2/5'>Create</button>
                        </div>
                       
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddCategory