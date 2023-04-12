import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { updateTotalSection,updateSection,deleteSection } from '../../../redux/createCourse';
import { Input,Textarea } from '@material-tailwind/react';
import {AiOutlinePlus} from 'react-icons/ai'
import { MdDelete } from 'react-icons/md';
import axios from 'axios';


function CourseFormThree({formik}) {
  const {totalSection,section} = useSelector(state=>state.createCourse);
  const dispatch = useDispatch(0)
  const [toggle,setToggle] = useState();
  const [title,setTitle] = useState('');
  const [desc,setDesc]=useState('')
  const [content,setContent] = useState('');
  const [secTitle,setSecTitle] = useState('')
  const [secDesc,setSecDesc] = useState('')
  const [video,setVideo] = useState(null);
  const [error,setError] = useState(false)
  const [path,setPath] = useState(null)

  function newSection(e){
    e.preventDefault()
      if(!title||!desc||!content||!secTitle||!secDesc){
        setError(true)
      }else{
        setError(false)
        let singleSection = {
          section_title:title,
          section_description:desc,
          content_type:content,
          video:path,
          content_title:secTitle,
          content_desc:secDesc,
          id:totalSection+1,
        }

        dispatch(updateTotalSection())
        dispatch(updateSection(singleSection))
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
    dispatch(updateTotalSection(totalSection-1))
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
        <h2 className='text-start text-2xl text-black font-semibold'>Curriculum</h2>
        <div className="w-full py-3">
          <button onClick={()=>{setToggle(!toggle)}} type='button' className='text-xl text-black border-2 border-black px-5 py-2 font-semibold flex place-content-between place-items-center'>Add New Section <AiOutlinePlus size={20}></AiOutlinePlus></button>
        </div>
        {
          toggle &&
            <div className="bg-gray-50 w-full p-5 gap-6 flex flex-col place-content-around" >
              <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                <Input label='Enter Section Title' variant='static' type='text' name="section_title" value={title} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter the section title"></Input>
              </div>
              <div className='w-full flex flex-col place-items-start place-content-center'>
                <Textarea label='Enter Section description' variant='static' type='text' name="section_description" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Enter the section description"/>
              </div>
              <div className="w-full flex flex-col place-items-start place-content-center">
                <select name="content_type" id="content_type" value={content} onChange={(e)=>setContent(e.target.value)} className='w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none'>
                      <option value='select'>select</option>
                      <option value="lecture">Lecture</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                </select>
              </div>
              {
                content === 'lecture' &&
                  <div className='w-full'>
                    <div className='w-full flex flex-col gap-4'>
                      <Input variant='static' type='text' label="Lecture Title" name='lecture-title' onChange={(e)=>{setSecTitle(e.target.value)}}/>
                      <Textarea variant='static' label='Description' name='lecture-description' onChange={(e)=>{setSecDesc(e.target.value)}}/>
                      <label htmlFor="lecture-video" className='text-sm text-gray-800'>Choose Lecture Video</label>
                      <input type='file' className=' file:w-40 file:h-20' label='Content Video' name='lecture-video' id='lecture-video' onChange={(e)=>{setVideo(e.target.files[0])}} accept="video/*"/>
                      {
                        video &&
                        <button className='text-lg font-light bg-primaryBlue cursor-pointer text-white w-1/5' type='button' onClick={()=>{uploadVideo()}}>{!path ? 'Upload Video' : 'Video Uploaded'}</button>
                      }
                      
                    </div>
                  </div>
              }
              
              <div className="w-full flex place-content-end">
                <button className=' bg-primaryBlue w-1/6 px-1 py-2 text-white font-semibold' type="button" onClick={(e)=>{newSection(e)}}>Add Section</button>
              </div>
              {
                error && <p className='text-red-600 font-extralight text-md'>All fileds are required</p>
              }
          </div>
        }
        {
          totalSection>0 &&
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