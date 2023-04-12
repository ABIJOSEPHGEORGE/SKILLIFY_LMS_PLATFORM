import { useEffect,useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { allCategories } from '../../../redux/categorySlice'
import axios from 'axios'
import { updateFormData } from '../../../redux/createCourse';
import { Form } from 'react-router-dom';


function CourseFormOne({formik}) {
    const {categories} = useSelector((state)=>state.category);
    const {formData} = useSelector((state)=>state.createCourse);
    const [subcategories,setSubcategories] = useState([])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allCategories())
    },[dispatch])

   
    const getSubcategories =async(event)=>{
        dispatch(updateFormData({...formData,category:event.target.value}))
        if(formData.category!=='select'){
            await axios.get(`/instructor/subcategories/${formData.category}`)
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
            <input type="text" name="course_title" value={formData.course_title} onChange={(e)=>{dispatch(updateFormData({...formData,course_title:e.target.value}))}}  placeholder="Enter the course title" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
            
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_subtitle" className="text-primaryBlue font-semibold text-xl py-2">Course Subtitle</label>
            <input type="text" name="course_subtitle" value={formData.course_subtitle} onChange={(e)=>{dispatch(updateFormData({...formData,course_subtitle:e.target.value}))}}  placeholder="Enter the course subtitle" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
         </div>
        <div className='w-full flex flex-col place-items-start place-content-center'>
            <label htmlFor="course_description" className="text-primaryBlue font-semibold text-xl py-2">Course Description</label>
            <textarea name="course_description" value={formData.course_description} onChange={(e)=>{dispatch(updateFormData({...formData,course_description:e.target.value}))}}  placeholder="Enter the course description" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full"/>
         </div>
         <div className="flex w-full place-content-around">
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="category" className="text-primaryBlue font-semibold text-xl py-2">Choose Category</label>
                <select name="category" value={formData.category}  onChange={(e)=>{getSubcategories(e)}}  placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full">
                    
                        <>
                            <option value="select">Select</option>
                            {
                                categories.map((item)=>(
                                    <option value={item._id}  className=' first-letter:uppercase'>{item.category_name.split("-").join(" ")}</option>
                                ))
                            }
                            
                        </>
                        
                        
                    
                </select>
            </div>
            <div className='flex-1 flex flex-col place-items-start place-content-center px-1'>
                <label htmlFor="sub_category" className="text-primaryBlue font-semibold text-xl py-2">Choose Sub Category</label>
                <select name="sub_category" value={formData.sub_category} onChange={(e)=>{dispatch(updateFormData({...formData,sub_category:e.target.value}))}} placeholder="Select course category" className="text-black px-5 py-1 border-b-2 focus:outline-none focus:border-primaryBlue w-full">
                    <>
                            <option value="select">Select</option>
                        {
                            subcategories.map((item)=>(
                                <option value={item.sub_category_name}>{item.sub_category_name.split("-").join(" ")}</option>
                            ))
                        }
                    </>
                </select>
              
            </div>
         </div>
    </div>
    
  )
}

export default CourseFormOne