import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { updateSection,deleteSection,updateSectionDesc,updateSectionTitle, updateLecture, createSection, createContent, updateAssignment } from '../../../redux/createCourse';
import { Input,Textarea } from '@material-tailwind/react';
import {AiFillPlayCircle, AiOutlineClose, AiOutlinePlus} from 'react-icons/ai'
import { MdDelete, MdHdrPlus, MdModeEdit, MdPlusOne } from 'react-icons/md';
import {HiDocument} from 'react-icons/hi'
import axios from 'axios';
import { GrClose, GrSave } from 'react-icons/gr';
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';


function CourseFormThree({formik}) {
  const {section,formData,lecture,assignment} = useSelector(state=>state.createCourse);
  const dispatch = useDispatch( )
  const [toggle,setToggle] = useState({section:false,curriculum:{status:false,index:''},lecture:{status:false,index:''},quiz:false,assignment:false});
  
  const [video,setVideo] = useState(null);
  const [path,setPath] = useState(null)

  function newSection(e){
    e.preventDefault()
    dispatch(createSection(section));
    setToggle({...toggle,section:!toggle.section});
    dispatch(updateSection({title:'',description:'',content:[]}))
  }

  const saveContent =(index,content_type)=>{
    if(content_type==="lecture"){
        dispatch(createContent({index:index,
        content:{title:lecture.title,description:lecture.description,video:lecture.video,content_type:content_type}}));
        dispatch(updateLecture({title:'',description:'',video:''}));
        setToggle({...toggle,lecture:!toggle.lecture})
    }else if(content_type==="assignment"){
      dispatch(createContent({index:index,
        content:{title:assignment.title,description:assignment.description,file_name:assignment.file_name,content_type:content_type}}));
        dispatch(updateAssignment({title:'',description:'',file_name:''}));
        setToggle({...toggle,assignment:!toggle.assignment})
    }

  }


  function handleDelete(index){
    dispatch(deleteSection(index));
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
        <h2 className='text-start text-2xl text-black font-semibold py-5'>Curriculum</h2>
        
        {
          formData.curriculum.length>0 &&
        <div className=' flex flex-col gap-6 overflow-y-scroll h-auto'>
            {
              formData.curriculum.map((item,index)=>(
                <div className="bg-gray-300 border-2 border-gray-600 bg-opacity-10 w-full h-auto p-5 gap-6 flex flex-col place-content-around">
                  <div className="w-full flex place-items-center gap-2">
                    <div className="w-full flex gap-3 place-items-center">
                      <h1 className='text-black font-semibold text-xl'>Section {index+1} :</h1>
                      <h2 className='text-black font-semibold text-md' > {item.title}</h2>
                    </div>
                    <div className="flex gap-3 place-items-center">
                      <MdDelete size={20} className="cursor-pointer" onClick={()=>{handleDelete(index)}}></MdDelete>
                      <MdModeEdit size={20} className='cursor-pointer'></MdModeEdit>
                    </div>
                    
                  </div>
                    <p className='text-black font-light text-sm' ><span className='text-black font-semibold text-md'>Description :</span> {item.description}</p>
                    <div className="w-full flex flex-col gap-2">
                      {
                        item.content.map((item,cindex)=>(
                          <div className='w-full m-2 p-2 bg-white border-gray-500 border-2 gap-6'>
                              <div className="flex gap-3 place-items-center">
                                <h1 className='font-semibold text-sm first-letter:capitalize'>{item.content_type} : </h1>
                                <h2 className='font-semibold text-sm first-letter:capitalize'>{item.title}</h2>
                              </div>
                              <div className='flex gap-3 place-items-center'>
                                  <h1 className='font-semibold text-sm first-letter:capitalize'>description : </h1>
                                  <p className='font-light text-sm'>{item.description}</p>
                              </div>
                              {
                                item.content_type==="lecture" ?
                                <div className="flex gap-3 place-items-center">
                                    <h1 className='font-semibold text-sm first-letter:capitalize'>video : </h1>'
                                    <p className='font-light text-sm'>{item.video_name}</p>
                                    <button className='text-md font-normal flex gap-2 place-items-center'><AiFillPlayCircle size={20}></AiFillPlayCircle>Preview</button>
                                </div>
                                : item.content_type==="assignment" ? 
                                <div className="flex gap-3 place-items-center">
                                    <h1 className='font-semibold text-sm first-letter:capitalize'>Document : </h1>'
                                    <p className='font-light text-sm'>{item.file_name}</p>
                                    <button className='text-md font-normal flex gap-2 place-items-center'><HiDocument size={20}></HiDocument> Preview</button>
                                </div>
                               :null
                              }
                              
                          </div>
                        ))
                      }
                    </div>
                    <div className="w-full flex place-content-start">
                        <button className='flex gap-3 place-items-center border-gray-600 border-2 p-2' type="button" onClick={()=>{setToggle({...toggle,curriculum:{status:!toggle.curriculum.status,index:index}})}}>Curriculum Item {toggle.curriculum.status && toggle.curriculum.index===index ? <AiOutlineClose size={20}></AiOutlineClose> : <AiOutlinePlus size={20}></AiOutlinePlus> }</button>  
                    </div> 
                    {
                      toggle.curriculum.status && toggle.curriculum.index===index &&
                      <motion.div initial={{opacity:0}} animate={{opacity:1}}
                      transition={{ ease: "easeOut", duration: 1 }}  className="w-full flex flex-col gap-14">
                        <div className='flex gap-3'>
                          <button type='button' className='text-primaryBlue flex gap-2 font-semibold' onClick={()=>{setToggle({...toggle,lecture:{status:!toggle.lecture.status,index:index}})}}>Lecture {!toggle.lecture.status ? <AiOutlinePlus size={20}></AiOutlinePlus> : <AiOutlineClose size={20}></AiOutlineClose>}</button>
                          <button type='button' className='text-primaryBlue flex gap-2 font-semibold' onClick={()=>{setToggle({...toggle,quiz:!toggle.quiz})}}>Quiz {!toggle.quiz ? <AiOutlinePlus size={20}></AiOutlinePlus> : <AiOutlineClose size={20}></AiOutlineClose>}</button>
                          <button type='button' className='text-primaryBlue flex gap-2 font-semibold' onClick={()=>{setToggle({...toggle,assignment:!toggle.assignment})}}>Assignment {!toggle.assignment ? <AiOutlinePlus size={20}></AiOutlinePlus> : <AiOutlineClose size={20}></AiOutlineClose>}</button>
                        </div>
                          {
                            toggle.lecture.status && toggle.lecture.index===index &&
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeOut", duration: 1 }}  className='w-full flex flex-col gap-6'>
                              <Input variant='static' label='Lecture Title' placeholder='Enter the title for the lecture' type='text' value={lecture.title} onChange={(e)=>{dispatch(updateLecture({...lecture,title:e.target.value}))}}/>
                              <Textarea variant='static' label='Lecture Description' placeholder='Enter the description for the lecture' type="text" value={lecture.description} onChange={(e)=>{dispatch(updateLecture({...lecture,description:e.target.value}))}}/>
                              <div className="w-full flex gap-3 flex-col">
                                <label htmlFor="video" className='text-sm text-gray-700'>Lecture Video</label>
                                <input type="file"  accept='video/*' onChange={(e)=>{dispatch(updateLecture({...lecture,video_name:e.target.files[0]}))}}/>
                              </div>
                              <div className="w-full flex place-content-start">
                                <button className='text-md border-2 border-gray-600  p-2 flex gap-3' onClick={()=>{saveContent(index,'lecture')}}>Save Lecture <GrSave size={20}></GrSave></button>
                              </div>
                            </motion.div>
                          }   
                          {
                            toggle.assignment &&
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeOut", duration: 1 }}  className='w-full flex flex-col gap-6'>
                              <Input variant='static' label='Assignment Title' placeholder='Enter the title for the assignment' type='text' value={assignment.title} onChange={(e)=>{dispatch(updateAssignment({...assignment,title:e.target.value}))}}/>
                              <Textarea variant='static' label='Assignment Description' placeholder='Enter the description for the assignment' type="text" value={assignment.description} onChange={(e)=>{dispatch(updateAssignment({...assignment,description:e.target.value}))}}/>
                              <div className="w-full flex gap-3 flex-col">
                                <label htmlFor="video" className='text-sm text-gray-700'>Assignment Document</label>
                                <input type="file" onChange={(e)=>{dispatch(updateLecture({...assignment,file_name:e.target.files[0]}))}}/>
                              </div>
                              <div className="w-full flex place-content-start">
                                <button className='text-md border-2 border-gray-600  p-2 flex gap-3' onClick={()=>{saveContent(index,'assignment')}}>Save Assignment <GrSave size={20}></GrSave></button>
                              </div>
                            </motion.div>
                          }
                          {
                            toggle.quiz &&
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeOut", duration: 1 }}  className='w-full flex flex-col gap-6'>
                              <Input variant='static' label='Assignment Title' placeholder='Enter the title for the assignment' type='text' value={assignment.title} onChange={(e)=>{dispatch(updateAssignment({...assignment,title:e.target.value}))}}/>
                              <Textarea variant='static' label='Assignment Description' placeholder='Enter the description for the assignment' type="text" value={assignment.description} onChange={(e)=>{dispatch(updateAssignment({...assignment,description:e.target.value}))}}/>
                              <div className="w-full flex gap-3 flex-col">
                                <label htmlFor="video" className='text-sm text-gray-700'>Assignment Document</label>
                                <input type="file" onChange={(e)=>{dispatch(updateLecture({...assignment,file_name:e.target.files[0]}))}}/>
                              </div>
                              <div className="w-full flex place-content-start">
                                <button className='text-md border-2 border-gray-600  p-2 flex gap-3' onClick={()=>{saveContent(index,'assignment')}}>Create Quiz <GrSave size={20}></GrSave></button>
                              </div>
                            </motion.div>
                          }
                      </motion.div>
                    }
                    
                </div>
              ))
            }
        </div>
          }
        
        <div className="w-full py-3">
          <button onClick={()=>{setToggle({...toggle,section:!toggle.section})}} type='button' className='text-md bg-white border-2 border-gray-600 px-5 py-3 font-normal flex place-content-between gap-2 place-items-center'>Section {!toggle.section ? <AiOutlinePlus size={20}></AiOutlinePlus> : <GrClose size={20}></GrClose>} </button>
        </div>

        {
          toggle.section &&
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ ease: "easeOut", duration: 1 }} className="bg-white w-full p-5 gap-6 flex flex-col place-content-around border-gray-600 border-2 my-3" >
              <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                <Input label='Enter Section Title' variant='static' type='text' name="section_title" value={section.title} onChange={(e)=>{dispatch(updateSection({...section,title:e.target.value}))}}  placeholder="Enter the section title"></Input>
              </div>
              <div className='w-full flex flex-col place-items-start place-content-center'>
                <Textarea label='Enter Section description' variant='static' type='text' name="section_description" value={section.description} onChange={(e)=>dispatch(updateSection({...section,description:e.target.value}))} placeholder="Enter the section description"/>
              </div>
              
              
              <div className="w-full flex place-content-end">
                <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white border-gray-600 border-2' type="button" onClick={(e)=>{newSection(e)}}>Add Section</button>
              </div>
             
          </motion.div>
        }
    </div>
  )
}

export default CourseFormThree