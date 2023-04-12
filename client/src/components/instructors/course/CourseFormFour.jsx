import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'


function CourseFormFour({formik}) {
    const [courseType,setCourseType] = useState()
    function handleCourseType (event){
        console.log(event.target.value)
        formik.handleChange(event);
        setCourseType(event.target.value)
    }
  return (
    <div className="font-poppins w-full h-auto flex flex-col place-content-evenly py-4 gap-4">
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_type" className="text-primaryBlue font-semibold text-xl py-2">Course Type</label>
            <select name="course_type" id="course_type" value={formik.course_type}  onChange={(e)=>{handleCourseType(e)}} className='w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none'>
                <option>Select</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
            </select>
         </div>
         {
            courseType==="premium" ?
            <div className='w-full flex flex-col place-items-start place-content-center'>
                <div className="flex w-full gap-3">
                    <div className='flex flex-col flex-1'>
                    <label htmlFor="course_price" className="text-primaryBlue font-semibold text-xl py-2">Course Price</label>
                        <input type='number' name="course_price" value={formik.course_description} onChange={formik.handleChange}  onBlur={formik.handleBlur} placeholder="Enter the course price" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                        {
                            formik.errors.course_price && formik.touched.course_price ? (
                                <p className='text-red-600 font-extralight text-md'>{formik.errors.course_price}</p>
                            )
                            : null
                        }
                    </div>
                    <div className='flex flex-col flex-1'>
                    <label htmlFor="course_sale_price" className="text-primaryBlue font-semibold text-xl py-2">Course Sale Price</label>
                        <input type='number' name="course_sale_price" value={formik.course_sale_description} onChange={formik.handleChange}  onBlur={formik.handleBlur} placeholder="Enter the course sale price" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                        {
                            formik.errors.course_sale_price && formik.touched.course_sale_price ? (
                                <p className='text-red-600 font-extralight text-md'>{formik.errors.course_sale_price}</p>
                            )
                            : null
                        }
                    </div>
                </div>
                
            </div>
            :null
         }
         <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_welcome_message" className="text-primaryBlue font-semibold text-xl py-2">Course Welcome Message</label>
            <textarea name="course_welcome_message" value={formik.course_welcome_message} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course welcome message" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            {
                formik.errors.course_welcome_message && formik.touched.course_welcome_message ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.course_welcome_message}</p>
                )
                : null
            }
         </div>
         <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_completion_message" className="text-primaryBlue font-semibold text-xl py-2">Course Completion Message</label>
            <textarea name="course_completion_message" value={formik.course_completion_message} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course completion message" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            {
                formik.errors.course_completion_message && formik.touched.course_completion_message ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.course_completion_message}</p>
                )
                : null
            }
         </div>
        
    </div>
  )
}

export default CourseFormFour