import { useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { allCategories } from '../../../redux/categorySlice'
import axios from 'axios'


function CourseFormOne({formik}) {
    const {categories} = useSelector((state)=>state.category)
    const [subcategories,setSubcategories] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allCategories())
    },[dispatch])

   
    const getSubcategories =async(event)=>{
        formik.handleChange(event)
        if(event.target.value!=='select'){
            await axios.get(`/instructor/subcategories/${event.target.value}`)
            .then((res)=>{
                console.log(res)
                setSubcategories(res.data.results.sub_category)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }
  return (
    <div className="font-poppins w-full h-full flex flex-col place-content-evenly gap-3">
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_title" className="text-primaryBlue font-semibold text-xl ppy-2">Course Title</label>
            <input type="text" name="course_title" value={formik.course_title} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            {
                formik.errors.course_title && formik.touched.course_title ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.course_title}</p>
                )
                : null
            }
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_subtitle" className="text-primaryBlue font-semibold text-xl py-2">Course Subtitle</label>
            <input type="text" name="course_subtitle" value={formik.course_subtitle} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            {
                formik.errors.course_subtitle && formik.touched.course_subtitle ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.course_subtitle}</p>
                )
                : null
            }
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_description" className="text-primaryBlue font-semibold text-xl py-2">Course Description</label>
            <textarea name="course_description" value={formik.course_description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            {
                formik.errors.course_description && formik.touched.course_description ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.course_description}</p>
                )
                : null
            }
         </div>
         <div className="flex w-full place-content-around">
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="category" className="text-primaryBlue font-semibold text-xl py-2">Choose Category</label>
                <select name="category" value={formik.category}  onChange={(e)=>{getSubcategories(e)}} onBlur={formik.handleBlur} placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full">
                    
                        <>
                            <option value="select">Select</option>
                            {
                                categories.map((item)=>(
                                    <option value={item._id}  className=' first-letter:uppercase'>{item.category_name.split("-").join(" ")}</option>
                                ))
                            }
                            
                        </>
                        
                        
                    
                </select>
                {
                formik.errors.category && formik.touched.category ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.category}</p>
                )
                : null
            }
            </div>
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="sub_category" className="text-primaryBlue font-semibold text-xl py-2">Choose Sub Category</label>
                <select name="sub_category" value={formik.sub_category} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full">
                    <>
                            <option value="select">Select</option>
                        {
                            subcategories.map((item)=>(
                                <option value={item.sub_category_name}>{item.sub_category_name.split("-").join(" ")}</option>
                            ))
                        }
                    </>
                </select>
                {
                formik.errors.sub_category && formik.touched.sub_category ? (
                    <p className='text-red-600 font-extralight text-md'>{formik.errors.sub_category}</p>
                )
                : null
            }
            </div>
         </div>
    </div>
    
  )
}

export default CourseFormOne