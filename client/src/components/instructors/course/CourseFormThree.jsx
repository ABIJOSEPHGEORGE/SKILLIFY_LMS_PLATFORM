import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { updateSection,deleteSection,updateSectionDesc,updateSectionTitle } from '../../../redux/createCourse';
import { Input,Textarea } from '@material-tailwind/react';
import {AiOutlinePlus} from 'react-icons/ai'
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';


function CourseFormThree({formik}) {
  const {section,section_title,section_description} = useSelector(state=>state.createCourse);
  const dispatch = useDispatch(0)
  const [toggle,setToggle] = useState();
  const [video,setVideo] = useState(null);
  const [path,setPath] = useState(null)

  function newSection(e){
    e.preventDefault()
      if(section_title==="" || !section_description===""){
        toast.error("Please fill all the fields")
      }else{
        
        let singleSection = {
          section_title:section_title,
          section_description:section_description,
          id:section.length+1,
        }
        dispatch(updateSection(singleSection))
        dispatch(updateSectionDesc(""));
        dispatch(updateSectionTitle(""));
        setToggle(false)
      }
      
  }

  function handleDelete(id){
    const sectionArray = section.filter((item)=>{
      if(item.id!==id){
        return item;
      }
    })
    
    console.log(sectionArray)
    dispatch(deleteSection(sectionArray));
  }

  async function uploadVideo(){
    // setVideo(e.target.files[0])
    const form = new FormData()
    form.append('section_video',video);
    axios.post('/instructor/course/upload-video',form)
    .then((res)=>{
      console.log(res)
        setPath(res.data.results.path)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  
  return (
    <div className="font-poppins w-full h-auto flex flex-col place-content-evenly py-4">
      <ToastContainer position='top-center' limit={3}></ToastContainer>
        <h2 className='text-start text-2xl text-black font-semibold'>Curriculum</h2>
        <div className="w-full py-3">
          <button onClick={()=>{setToggle(!toggle)}} type='button' className='text-md bg-white shadow-lg px-5 py-3 rounded-md font-normal flex place-content-between gap-2 place-items-center'>Add New Section {!toggle ? <AiOutlinePlus size={20}></AiOutlinePlus> : <GrClose size={20}></GrClose>} </button>
        </div>
        {
          toggle &&
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="bg-white w-full p-5 gap-6 flex flex-col place-content-around shadow-xl rounded-xl" >
              <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                <Input label='Enter Section Title' variant='static' type='text' name="section_title" value={section_title} onChange={(e)=>{dispatch(updateSectionTitle(e.target.value))}}  placeholder="Enter the section title"></Input>
              </div>
              <div className='w-full flex flex-col place-items-start place-content-center'>
                <Textarea label='Enter Section description' variant='static' type='text' name="section_description" value={section_description} onChange={(e)=>dispatch(updateSectionDesc(e.target.value))} placeholder="Enter the section description"/>
              </div>
              
              
              <div className="w-full flex place-content-end">
                <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white shadow-xl rounded-md' type="button" onClick={(e)=>{newSection(e)}}>Add Section</button>
              </div>
             
          </motion.div>
        }
        {
          section.length>0 &&
        <div className=' h-80 flex flex-col gap-6 overflow-y-scroll'>
            {
              section.map((item,index)=>(
                <div className="bg-gray-100 w-full h-auto p-5 gap-6 flex flex-col place-content-around">
                  <div className="w-full flex place-items-center gap-2">
                    <h1 className='text-black font-semibold text-xl'>Section {item.id} :</h1>
                    <h2 className='text-black font-semibold text-md' > {item.section_title}</h2>
                    <MdDelete size={20} className="cursor-pointer" onClick={()=>{handleDelete(item.id)}}></MdDelete>
                  </div>
                    <p className='text-black font-light text-sm' ><span className='text-black font-semibold text-md'>Description :</span> {item.section_description}</p>
                  <div className='w-full h-3/5 flex flex-col gap-3 place-items-start place-content-start bg-white p-3'>
                    
                    <div className="flex flex-col gap-3">
                      <p className='text-black font-light text-sm' ><span className='text-gray-600 text-md font-semibold'>Content Type :</span> {item.content_type}</p>
                      <h3 className='text-black text-sm font-light'><span className='text-gray-600 text-md font-semibold'>Title : </span>{item.content_title}</h3>
                      <h3 className='text-black text-sm font-light'><span className='text-gray-600 text-md font-semibold'>Description : </span>{item.content_desc}</h3>
                      <div className='w-full flex gap-3 '>
                            <h1 className='text-gray-600 text-md font-semibold'>Video : </h1>
                            <p className="text-black text-sm font-light">{item?.video?.name}</p>
                      </div>
                    </div>
                     
                  </div>       
                </div>
              ))
            }
        </div>
          }
        
       
    </div>
  )
}

export default CourseFormThree