import React, { useState } from 'react'
import { Input } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFormData } from '../../../redux/createCourse'

function CourseFormFour() {
    const dispatch = useDispatch()
    const {formData} = useSelector((state)=>state.createCourse)
    const [courseType,setCourseType] = useState()
    const  handleCourseType =(event)=>{
        dispatch(updateFormData({...formData,course_type:event.target.value}))
        setCourseType(event.target.value)
    }
  return (
    <div className="font-poppins w-full h-auto flex flex-col place-content-evenly py-4 gap-4">
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_type" className="text-primaryBlue font-semibold text-xl py-2">Course Type</label>
            <select name="course_type" id="course_type" value={formData.course_type} onChange={(e)=>{handleCourseType(e)}} className='w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none'>
                <option>Select</option>
                <option value="free">Free</option>
                <option value="premium">Premium</option>
            </select>
         </div>
         {
            formData.course_type==="premium" &&
            <div className='w-full flex flex-col place-items-start place-content-center'>
                <div className="flex w-full gap-3">
                    <div className='flex flex-col flex-1'>
                    <label htmlFor="course_price" className="text-primaryBlue font-semibold text-xl py-2">Course Price</label>
                        <input type='number' name="course_price" value={formData.course_price} onChange={(e)=>{dispatch(updateFormData({...formData,course_price:e.target.value}))}} placeholder="Enter the course price" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                        
                    </div>
                    <div className='flex flex-col flex-1'>
                    <label htmlFor="course_sale_price" className="text-primaryBlue font-semibold text-xl py-2">Course Sale Price</label>
                        <input type='number' name="course_sale_price" value={formData.course_sale_price} onChange={(e)=>{dispatch(updateFormData({...formData,course_sale_price:e.target.value}))}} placeholder="Enter the course sale price" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
                       
                    </div>
                </div>
                
            </div>
         }
         <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_welcome_message" className="text-primaryBlue font-semibold text-xl py-2">Course Welcome Message</label>
            <textarea name="course_welcome_message" value={formData.course_welcome_message} onChange={(e)=>{dispatch(updateFormData({...formData,course_welcome_message:e.target.value}))}} placeholder="Enter the course welcome message" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
          
         </div>
         <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_completion_message" className="text-primaryBlue font-semibold text-xl py-2">Course Completion Message</label>
            <textarea name="course_completion_message" value={formData.course_completion_message} onChange={(e)=>{dispatch(updateFormData({...formData,course_completion_message:e.target.value}))}} placeholder="Enter the course completion message" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            
         </div>
        
    </div>
  )
}

export default CourseFormFour