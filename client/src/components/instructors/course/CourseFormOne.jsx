
function CourseFormOne({formik}) {
    
  return (
    <div className="font-poppins w-full h-full flex flex-col place-content-evenly">
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl ppy-2">Course Title</label>
            <input type="text" name="course_title" value={formik.course_title} onChange={formik.handleChange} placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_subtitle" className="text-primaryBlue font-semibold text-xl py-2">Course Subtitle</label>
            <input type="text" name="course_subtitle" value={formik.course_subtitle} onChange={formik.handleChange} placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_description" className="text-primaryBlue font-semibold text-xl py-2">Course Description</label>
            <textarea name="course_description" value={formik.course_description} onChange={formik.handleChange} placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
         </div>
         <div className="flex w-full place-content-around">
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="category" className="text-primaryBlue font-semibold text-xl py-2">Choose Category</label>
                <select name="category" value={formik.category} onChange={formik.handleChange} placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full">
                    <option>Development</option>
                    <option>Machine Learning</option>
                </select>
            </div>
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="category" className="text-primaryBlue font-semibold text-xl py-2">Choose Sub Category</label>
                <select name="category" value={formik.category} onChange={formik.handleChange} placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full">
                    <option>Web Development</option>
                    <option>App Development</option>
                </select>
            </div>
         </div>
    </div>
    
  )
}

export default CourseFormOne