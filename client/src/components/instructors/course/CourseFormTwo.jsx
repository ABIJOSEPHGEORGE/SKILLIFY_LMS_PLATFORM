import React from 'react'

function CourseFormTwo({formik}) {
  return (
    <div className="font-poppins w-full h-full flex  place-content-start place-items-center ">
        <div  className='w-3/5 flex flex-col place-items-start place-content-center px-3'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl py-2">Course Image</label>
            <img src="/instructor/image-placeholder.png" alt="image_preview" className="border-2 border-gray-100 p-5 my-5"/>
            <input
            class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            id="formFileLg"
            type="file" />
        </div>
        <div  className='w-3/5 flex flex-col place-items-start place-content-center px-3'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl py-2">Promotional Video</label>
            <img src="/instructor/image-placeholder.png" alt="image_preview" className="border-2 border-gray-100 p-5 my-5"/>
            <input
            class="relative  m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
            id="formFileLg"
            type="file" />
        </div>
    </div>

  )
}

export default CourseFormTwo