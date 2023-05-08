import { Input, Option, Select, Textarea } from '@material-tailwind/react'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { announcementSchema } from '../../validations/FormValidations'
import axios from 'axios'

function EditAnnouncement({toggle,setToggle,fetchAnnouncements}) {
    const [courses,setCourses] = useState()
    const {payload} = toggle;
    
    const {handleSubmit,handleBlur,handleChange,errors,touched,values} = useFormik({
        enableReinitialize:true,
        initialValues:{
            announcement:payload?.message,
            course:payload?.courseId?._id,
            title:payload?.title,
        },
        validationSchema:announcementSchema,
        onSubmit:values=>{
            updateAnnouncement(values)
        }
    })

    useEffect(()=>{
        fetchCourses()
    },[])

    async function fetchCourses(){
        try{
            const res = await axios.get('/instructor/course');
            setCourses(res.data.results)
        }catch(err){
            console.log(err)
        }
    }

    async function updateAnnouncement(values){
        try{
            await axios.put(`/instructor/announcement/${payload?._id}`,values);
            toast.success("Announcement Successfully Updated");
            setToggle({edit:false});
            fetchAnnouncements()
        }catch(err){
            toast.error("Something went wrong...")
        }
    }

   
  return (
    <div className='w-full h-full flex flex-col place-items-center place-content-center bg-black absolute top-0 left-0 bg-opacity-5'>
        <ToastContainer limit={2} position='top-center'></ToastContainer>
        <div className=" w-2/5  rounded-lg p-5 bg-white flex flex-col place-content-center place-items-start">
            <div className="w-full flex place-content-end">
                <AiOutlineCloseCircle size={20} className=" cursor-pointer" onClick={()=>setToggle({edit:false})}></AiOutlineCloseCircle>
            </div>
            <div className="w-full flex flex-col gap-3">
                
                <form className='flex flex-col gap-6 ' onSubmit={handleSubmit}>
                <select defaultValue={payload?.courseId?._id} className="select select-ghost w-full mt-3 border-b-2 outline-none" name='course' onChange={handleChange} onBlur={handleBlur}>
                    <option disabled>Select the course</option>
                    {
                        courses?.map((ele,index)=>(
                            ele._id === payload?.courseId?._id ?
                            <option key={index} selected value={ele._id}>{ele.course_title}</option>
                            :
                            <option key={index} value={ele._id}>{ele.course_title}</option>
                        ))
                    }
                </select>
                    {
                        errors.course && touched.course &&
                        <p className='text-sm text-red-500'>{errors.course}</p>
                    }
                    <Input label='Announcement Title' defaultValue={payload?.title} variant='static' placeholder='Enter title for announcement' name='title' onChange={handleChange} onBlur={handleBlur}/>
                    {
                        errors.title && touched.title &&
                        <p className='text-sm text-red-500'>{errors.title}</p>
                    }
                    <Textarea label='Announcement' variant='static' defaultValue={payload?.message} placeholder='Enter your announcement' name='announcement'  onChange={handleChange} onBlur={handleBlur}/>
                    {
                        errors.announcement && touched.announcement &&
                        <p className='text-sm text-red-500'>{errors.announcement}</p>
                    }
                    <div className="w-full flex place-content-center">
                        <button className="bg-primaryBlue text-white px-3 py-2 rounded-3xl w-1/5" type='submit'>Edit</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default EditAnnouncement