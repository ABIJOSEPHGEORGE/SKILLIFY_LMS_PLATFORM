import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Tabs, TabsHeader, Accordion, AccordionBody, AccordionHeader, Tab, TabPanel, TabsBody } from '@material-tailwind/react'
import { AiOutlineBulb } from 'react-icons/ai'
import { MdOndemandVideo } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import {ImFileVideo} from 'react-icons/im'
import { details } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import { updateToggle } from '../../redux/attendCourseSlice';



function AttendCourse() {

    const { toggle, course } = useSelector((state) => state.attendCourse)
    const dispatch = useDispatch();

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
                className={`${id === open ? "rotate-180" : ""
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
    console.log(course)
    return (
        <div className='absolute top-0 left-0 z-50 w-full h-full font-poppins'>
            <div className="w-full bg-secondary flex flex-col place-items-center p-5 h-full">
                <div className="w-full p-5 flex place-content-evenly place-items-center">
                    <div className="w-[15%] border-r-2 border-darkPink flex  place-content-start place-items-center">
                        <h1 className='text-xl font-semibold'>Skillify</h1>
                    </div>
                    <div className="w-[70%] flex  place-content-between place-items-center px-3">
                        <h1 className='text-xl font-semibold'>{course?.course_id?.course_title}</h1>
                        <h2 className='text-darkPink font-semibold text-md'>Completed : {course?.progress}%</h2>
                    </div>
                    <div className='w-[15%] flex  place-items-center place-content-end'>
                        <div className="flex flex-col place-content-center place-items-center cursor-pointer" onClick={() => dispatch(updateToggle(!toggle))}>
                            <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
                            <h3 className='text-md font-semibold'>Exit</h3>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-2 h-full py-5">
                    <video className='w-3/4 h-full' src="" controls></video>
                    <div className="w-1/4 flex flex-col bg-white place-items-center">
                        <h2 className='text-xl font-semibold text-center p-3'>Course Content</h2>
                        <div className="w-full flex flex-col gap-3">
                            {
                                course?.course_id?.curriculum?.map((section, index) => (
                                    <Accordion open={open === index} icon={<Icon id={index} open={open} />} className='bg-white px-5'>
                                        <AccordionHeader onClick={() => handleOpen(index)} className='text-lg font-semibold font-poppins capitalize tracking-wider'>
                                            {section.title}
                                        </AccordionHeader>
                                        <AccordionBody>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-gray-600 font-light text-md font-poppins'>{section.description}</p>

                                                {
                                                    section?.content?.map((content, index) => (
                                                        <Accordion open={contOpen === index}>
                                                            {/* <AccordionHeader onClick={() => handleContOpen(index)} className='text-md font-semibold  capitalize font-poppins'>
                                                                <h2 className='flex gap-3 place-items-center'>{content.content_type === "lecture" ? <MdOndemandVideo size={20}></MdOndemandVideo> : content.content_type === "quiz" ? <AiOutlineBulb size={20}></AiOutlineBulb> : <HiDocumentDuplicate size={20}></HiDocumentDuplicate>} {content.title} | {content.content_type}</h2>

                                                            </AccordionHeader> */}
                                                            <AccordionBody className="font-poppins">
                                                                <div className="w-full flex flex-col gap-3">
                                
                                                                    {
                                                                        content.content_type==="lecture" &&
                                                                        <div className='flex place-items-center gap-2 cursor-pointer hover:bg-lightblue p-3'>
                                                                            <MdOndemandVideo size={20}></MdOndemandVideo>
                                                                            <h3 className=' font-semibold border-r-2 border-darkPink px-2'>{content.title}</h3>
                                                                            <h3 className='text-md font-semibold capitalize'>{content.content_type}</h3>
                                                                        </div>
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
                    </div>
                </div>
            </div>


            <div className='w-full p-5'>
                <div className='flex flex-col w-full h-full'>
                    {
                        course?.progress < 5 &&
                        <div className='w-full p-5 flex gap-3 place-items-center place-content-center'>
                            <div className="flex gap-2 place-items-center border-r-2 border-darkPink px-2">
                                <img className='w-10 h-10' src={course?.profile_image ? details.base_url+course?.course_id?.tutor?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                                <div className='flex flex-col place-content-center'>
                                    <h1 className='font-semibold text-gray-600'>{course?.course_id?.tutor.first_name} {course?.course_id?.tutor.last_name}</h1>
                                    <p className='text-sm text-gray-500'>Instructor</p>
                                </div>
                                
                            </div>
                            <h3>{course?.course_id?.course_welcome_message}</h3>
                        </div>
                    }
                    <div className="w-3/5 px-5 py-10 flex flex-col place-items-center">

                        <Tabs value="overview" className="w-full px-10">
                            <TabsHeader
                                className="bg-transparent"
                                indicatorProps={{
                                    className: "bg-blue-500/10 shadow-none text-blue-500",
                                }}

                            >

                                <Tab key="overview" value="overview" className=' font-normal font-poppins py-3'>
                                    Overview
                                </Tab>
                                <Tab key="curriculum" value="curriculum" className='font-normal font-poppins py-3'>
                                    Curriculum
                                </Tab>
                                <Tab key="instructor" value="instructor" className='font-normal font-poppins py-3'>
                                    Instructor
                                </Tab>
                                <Tab key="reviews" value="reviews" className='font-normal font-poppins py-3'>
                                    Reviews
                                </Tab>

                            </TabsHeader>
                            <TabsBody>

                                <TabPanel key="Overview" value="overview">
                                    <div className='flex flex-col gap-3'>
                                        <h1 className='text-xl font-semibold text-black font-poppins'>Course Description</h1>
                                        <p className='text-gray-700'>{course?.course_id?.course_description}</p>
                                    </div>
                                </TabPanel>

                                <TabPanel key="curriculum" value="curriculum">
                                    <div className="w-full flex flex-col gap-3">
                                        {
                                            
                                            course?.course_id?.curriculum?.map((section, index) => (
                                                <Accordion open={open === index} icon={<Icon id={index} open={open} />} className='bg-gray-100 px-5'>
                                                    <AccordionHeader onClick={() => handleOpen(index)} className='text-lg font-semibold font-poppins capitalize tracking-wider'>
                                                        {section.title}
                                                    </AccordionHeader>
                                                    <AccordionBody>
                                                        <div className='flex flex-col gap-4'>
                                                            <p className='text-gray-600 font-light text-md font-poppins'>{section.description}</p>

                                                            {
                                                                section?.content?.map((content, index) => (
                                                                    <Accordion open={contOpen === index}>
                                                                        <AccordionHeader onClick={() => handleContOpen(index)} className='text-md font-semibold  capitalize font-poppins'>
                                                                            <h2 className='flex gap-3 place-items-center'>{content.content_type === "lecture" ? <MdOndemandVideo size={20}></MdOndemandVideo> : content.content_type === "quiz" ? <AiOutlineBulb size={20}></AiOutlineBulb> : <HiDocumentDuplicate size={20}></HiDocumentDuplicate>} {content.title} | {content.content_type}</h2>

                                                                        </AccordionHeader>
                                                                        <AccordionBody className="font-poppins">
                                                                            {content.description}
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
                                                <img className='w-14 h-14' src={course?.profile_image ? details.base_url + course?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                                            </div>
                                            <div className="flex flex-col gap-3 place-content-start">
                                                <h1 className='flex gap-3 font-poppins text-xl font-semibold text-black'>{course?.tutor?.first_name} {course?.tutor?.last_name}</h1>
                                            </div>
                                        </div>
                                        <p className='text-xl text-gray-600 '>{course?.tutor?.description}</p>
                                    </div>
                                </TabPanel>
                                <TabPanel key="reviews" value="reviews">
                                    Reviews
                                </TabPanel>

                            </TabsBody>
                        </Tabs>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendCourse