import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useSearchParams } from 'react-router-dom';
import { details } from '../../config';
import { Tabs,TabsHeader,Tab,TabPanel,TabsBody,Accordion,AccordionHeader,AccordionBody, Textarea } from '@material-tailwind/react';
import Reviews from '../users/Reviews';
import { AiOutlineBulb, AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOndemandVideo, MdOutlineComputer } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { BsBook, BsClockHistory } from 'react-icons/bs';
import {RiVideoFill} from 'react-icons/ri'

function ViewCourse() {
    const [course,setCourse] = useState({});
    const [params] = useSearchParams();
    const [toggle,setToggle] = useState(false);
    const [reason,setReason] = useState('');
    const courseId = params.get('id')
    useEffect(()=>{
        fetchCourse()
    },[])
    function fetchCourse(){
        axios.get(`/admin/course/${courseId}`)
        .then((res)=>{
            setCourse(res.data.results)
        })
        .catch((err)=>{
            toast.error("Something wen't wrong")
        })
    }
    const [open, setOpen] = useState(0);
    
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }
    const [contOpen, setContOpen] = useState(0);
    
    const handleContOpen = (value) => {
        setContOpen(contOpen === value ? 0 : value);
    }

    function Icon({ id, open }) {
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        );
      }

      function handleApprove(){
        axios.put(`/admin/course/approve/${courseId}`)
        .then((res)=>{
            fetchCourse()
        })
        .catch((err)=>{
            console.log(err)
        })
      }

      function handleReject(e){
        e.preventDefault()
        axios.put(`/admin/course/reject/${courseId}`,{reason:reason})
        .then((res)=>{
            setToggle(false);
            fetchCourse()
        })
        .catch((err)=>{
            console.log(err)
        })
      }

      function courseStatus(status){
        axios.put(`/admin/course/status/${courseId}?status=${status}`)
        .then((res)=>{
            fetchCourse()
        })
        .catch((err)=>{
            console.log(err)
        })
      }
  return (
    <div className='h-full w-full font-poppins'>
        <div className="w-full z-50  bg-white border-b-2 border-darkPink h-auto p-5 flex place-content-between place-items-center">
            <div className='flex gap-3'>
                <h2 className='text-lg font-semibold text-primaryBlue'>Course Status :</h2>
                {
                                course.isApproved==="approved" ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Active
                                </span>
                                : course.isApproved ==="pending" ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                    Pending
                                 </span>
                                 : 
                                 <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                 <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                     Rejected
                                  </span>
                 }  
            </div>
                <div className="flex place-items center place-content-center gap-8">
                    {
                        course.isApproved==="approved" && course.status ===false ?
                        <div className='flex gap-8'>
                            <button className='px-5 py-2 text-white text-center bg-green-500' onClick={()=>{courseStatus(true)}}>List Course</button>
                        </div>
                        : course.isApproved==="approved" && course.status ?
                        <div>
                            <button className='px-5 py-2 text-white text-center bg-red-500' onClick={()=>{courseStatus(false)}}>Unlist Course</button>
                        </div>
                        :
                        <div className='flex gap-8'>
                            <button className='px-5 py-2 text-white text-center bg-green-500' onClick={()=>{handleApprove()}}>Approve</button>
                            <button className='px-5 py-2 text-white text-center bg-red-500' onClick={()=>{setToggle(true)}}>Reject</button>
                        </div>
                    }
                    
                    <Link to="/admin/courses" className='flex place-items-center'>
                        <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
                    </Link>
                </div>
                
        </div>
        <ToastContainer position='top-center'></ToastContainer>
        <div className="w-full h-auto bg-secondary">
            
            <div className="w-full h-full py-5  flex  place-content-start px-14">
                <div className='w-3/5 h-full flex flex-col gap-5  place-content-start'>
                    <h2 className='text-3xl font-bold '>{course.course_title}</h2>
                    <h2 className='text-xl font-normal '>{course.course_subtitle}</h2>
                </div>
                <div className="shadow-xl bg-white absolute right-36 h-auto px-1 py-8 w-80 flex-col flex gap-8 place-items-center">
                    <div className='p-3 rounded-md w-full h-60'>
                        <video className='w-full h-full' src={details.base_url+course.promotional_video} controls></video>
                    </div>
                    <div className="flex gap-3 place-content-center">
                        <p className='text-3xl font-semibold text-darkPink'>{'₹ '+course.course_sale_price}</p>
                        <p className='text-3xl font-normal line-through text-gray-600'>{'₹ '+course.course_price}</p>
                    </div>
                    
                    <div className="w-full px-3 flex flex-col gap-3">
                        <h2 className='text-xl font-semibold '>This course includes</h2>
                        <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><BsBook size={20} className='text-green-500'></BsBook> Language - English</li>
                        <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><MdOutlineComputer size={20} className='text-green-500'></MdOutlineComputer>Use on desktopp, mobile and laptop</li>
                        <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><BsClockHistory size={20} className='text-green-500'></BsClockHistory>Lifetime Access</li>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col w-full h-full'>
            <div className="w-3/5 px-5 py-10 flex flex-col place-items-center">
                <Tabs value="overview" className="w-full px-10">
                    <TabsHeader
                        className="bg-transparent"
                        indicatorProps={{
                            className: "bg-blue-500/10 shadow-none text-blue-500",
                          }}
              
                    >
                    
                        <Tab key="overview" value="overview" className=' font-semibold py-3'>
                            Overview
                        </Tab>
                        <Tab key="curriculum" value="curriculum" className=' font-semibold py-3'>
                            Curriculum
                        </Tab>
                        <Tab key="instructor" value="instructor" className=' font-semibold py-3'>
                            Instructor
                        </Tab>
                       
                    
                    </TabsHeader>
                    <TabsBody>
                        
                        <TabPanel key="Overview" value="overview">
                            <div className='flex flex-col gap-3'>
                                <h1 className='text-xl font-semibold text-black'>Course Description</h1>
                                <p className='text-gray-700'>{course.course_description}</p>
                            </div>
                        </TabPanel>

                        <TabPanel key="curriculum" value="curriculum">
                            <div className="w-full flex flex-col gap-3">
                                {
                                    course &&
                                    course?.curriculum?.map((section,index)=>(
                                        <Accordion open={open === index} icon={<Icon id={index} open={open} />} className='bg-gray-100 px-5'>
                                            <AccordionHeader onClick={() => handleOpen(index)} className='text-lg font-semibold font-poppins capitalize tracking-wider'>
                                                {section.title}
                                            </AccordionHeader>
                                            <AccordionBody>
                                                <div className='flex flex-col gap-4'>
                                                    <p className='text-gray-600 font-light text-md font-poppins'>{section.description}</p>
                                                    
                                                    {
                                                        section?.content?.map((content,index)=>(
                                                            <Accordion open={contOpen === index}>
                                                                <AccordionHeader onClick={() => handleContOpen(index)} className='text-md font-semibold flex place-items-center gap-1 capitalize font-poppins'>
                                                                    <h2 className='flex gap-3 place-items-center text-start'>{ content.content_type==="lecture" ? <MdOndemandVideo size={20}></MdOndemandVideo> : content.content_type==="quiz" ? <AiOutlineBulb size={20}></AiOutlineBulb> : <HiDocumentDuplicate size={20}></HiDocumentDuplicate> } {content.title} <span className='border-l-2 border-primary px-1'>{content.content_type}</span></h2>
                                                                </AccordionHeader>
                                                                <AccordionBody className="font-poppins">
                                                                    <div className="flex flex-col place-content-centere">
                                                                        <p className='text-md'>{content.description}</p>
                                                                        {
                                                                            content.content_type==="lecture" ?
                                                                            <div className='w-full p-3 flex gap-3 place-items-center'>
                                                                                <RiVideoFill size={20}></RiVideoFill>
                                                                                <a className='text-black font-semibold font-poppins text-md' href={details.base_url+content?.video_path} rel='noreferrer' target="_blank">Preview</a>
                                                                            </div>
                                                                            : content.content_type==="quiz" ? 
                                                                            <div className='w-full p-3 flex flex-col gap-3 place-content-center'>
                                                                                <h1 className='text-md font-semibold '>Questions : </h1>
                                                                                {
                                                                                    content?.questions?.map((question,qindex)=>(
                                                                                       <div key={qindex} className='flex flex-col gap-2'>
                                                                                             <p>{qindex+1}) {question.question}</p>
                                                                                             <h3 className='text-md font-semibold'>Options :</h3>
                                                                                                    <div className='w-full flex place-items-center gap-3'>
                                                                                                        
                                                                                                    {
                                                                                                        question?.options?.map((option,opindex)=>(
                                                                                                            <p key={opindex}>{opindex+1}) {option?.answer}</p>
                                                                                                        ))
                                                                                                    }
                                                                                                    </div>
                                                                                              
                                                                                       </div>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                            :null
                                                                        }
                                                                    </div>
                                                                </AccordionBody>
                                                            </Accordion>
                                                        ))
                                                    }
                                                </div>
                                            </AccordionBody>
                                        </Accordion>
                                    ))
                                }
                            
                                
                            </div>
                        </TabPanel>
                        <TabPanel key="instructor" value="instructor">
                            <div className="w-full bg-gray-100 p-5">
                                <div className="flex gap-2 place-items-center">
                                    <div className="w-20">
                                        <img className='w-14 h-14' src={course?.profile_image ? details.base_url+course?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                                    </div>
                                    <div className="flex flex-col gap-3 place-content-start">
                                        <h1 className='flex gap-3 font-poppins text-xl font-semibold text-black'>{course?.tutor?.first_name} {course?.tutor?.last_name}</h1>
                                    </div>
                                </div>
                                <p className='text-xl text-gray-600 '>{course?.tutor?.description}</p>
                            </div>
                        </TabPanel>
                       
                    
                    </TabsBody>
                    </Tabs>

            </div>
        </div>
        {
            toggle &&
            <div className='absolute z-50 top-0 left-0 w-full h-full bg-black bg-opacity-5 flex place-content-center place-items-center'>
                <div className="bg-white w-2/5 rounded-md p-5">
                    <div className="flex place-content-end place-items-end cursor-pointer" onClick={()=>{setToggle(false)}}>
                        <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
                    </div>
                    <form className='flex flex-col gap-3'>
                        <h2 className='text-center text-md text-primaryBlue font-semibold'>Reason for rejection ?</h2>
                        <Textarea label='Reason' value={reason} onChange={(e)=>{setReason(e.target.value)}} variant='static' color='red'></Textarea>
                        <button className='text-white font-semibold bg-red-500 px-5 py-3' onClick={(e)=>{handleReject(e)}}>Reject</button>
                    </form>
                </div>
            </div>
        }
    </div>
  )
}

export default ViewCourse