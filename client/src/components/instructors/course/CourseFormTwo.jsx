import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {  updateError, updateFormData } from '../../../redux/createCourse'
import { imageValidation,videoValidation} from '../../../validations/FormValidations';
import {AiOutlineEdit} from 'react-icons/ai'
import { details } from '../../../config';



function CourseFormTwo() { 
  const {formData,error} = useSelector((state)=>state.createCourse);
  const dispatch =  useDispatch()

  function handleImageUpload(e){
      const imageValid = imageValidation(e.target.files[0]);
      console.log(e.target.files[0])
      dispatch(updateError({...error,course_image:''}))
      if(!imageValid.valid){
        dispatch(updateError({course_image:imageValid.reason}))
      }else{
        dispatch(updateFormData({...formData,course_image:e.target.files[0]}))
      }
  }

  function handleVideoUpload(e){
      const videoValid = videoValidation(e.target.files[0]);
      dispatch(updateError({...error,promotional_video:''}))
      if(!videoValid.valid){
        dispatch(updateError({promotional_video:videoValid.reason}))
      }else{
        dispatch(updateFormData({...formData,promotional_video:e.target.files[0]}))
      }
  }
  
  return ( 
    <div className="font-poppins w-full h-full flex  place-content-start place-items-start ">
        <div  className='w-3/5 flex flex-col place-items-start place-content-center px-3'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl py-2">Course Image</label>
            <img src={!formData.course_image ? "/instructor/image-placeholder.png" : formData.edit_mode && typeof(formData.course_image)==='string' ? details.base_url+formData.course_image : URL.createObjectURL(formData.course_image)} alt="image_preview" className="w-3/5 border-2 border-gray-100 p-5 my-5"/>
            {
              !formData.course_image ?
              <>
              <input
              class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
              id="formFileLg"
              type="file"
              accept="image/*"
              onClick={()=>dispatch(updateFormData({...formData,course_image:null}))}
              onChange={(e)=>{handleImageUpload(e)}}
              />
              {
                error?.course_image && 
                <p className='text-red-600 font-extralight text-md'>{error.course_image}</p>
              }
              </>
              :
              <>
                <button className='text-gray-600 text-md flex place-items-center gap-3' onClick={()=>dispatch(updateFormData({...formData,course_image:null}))}>Change Image <AiOutlineEdit size={20}></AiOutlineEdit> </button>
              </>
            }
            
        </div>
        <div  className='w-3/5 flex flex-col place-items-start place-content-center px-3'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl py-2">Promotional Video</label>
            {
              !formData.promotional_video ?

              <img src="/instructor/image-placeholder.png" alt="image_preview" className="border-2 border-gray-100 p-5 my-5 w-full h-full"/>
              :
            
              <video src={formData.edit_mode && typeof(formData.promotional_video)==='string' ? details.base_url+formData.promotional_video :URL.createObjectURL(formData.promotional_video)} alt="video_preview" className="border-2 border-gray-100 p-5 my-5" controls/>
            
            }
            
            
            {
              !formData.promotional_video ?
              <>
              <input
                class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                id="formFileLg"
                type="file" 
                accept="video/*"
                onChange={(e)=>{handleVideoUpload(e)}}
                />
                {
                  error?.promotional_video &&
                  <p className='text-red-600 font-extralight text-md'>{error.promotional_video}</p>
                }
              </>
              :
              <>
                <button className='text-gray-600 text-md flex place-items-center gap-3' onClick={()=>dispatch(updateFormData({...formData,promotional_video:null}))}>Change Video <AiOutlineEdit size={20}></AiOutlineEdit> </button>
              </>
            }
        </div>
    </div>

  )
}

export default CourseFormTwo