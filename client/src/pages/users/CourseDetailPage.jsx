import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../../components/users/NavBar'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { details } from '../../config'
import { BsBook, BsClockHistory } from 'react-icons/bs'
import { MdOndemandVideo, MdOutlineComputer } from 'react-icons/md'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux'
import { updateSingleCourse } from '../../redux/course'
import { AiOutlineBulb } from 'react-icons/ai'
import { HiDocumentDuplicate } from 'react-icons/hi'
import Reviews from '../../components/users/Reviews'
import Footer from '../../components/users/Footer'
import Loader from '../../components/utils/Loader'
import { updateLoading } from '../../redux/authSlice'
import { GetAndDecode } from 'react-hook-collections'

  
  

function CourseDetailPage() {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const cartRef = useRef()
    const {id} = useParams()
    const [state,setState]= useState({cart:false,enrolled:false})
    const {course} = useSelector((state)=>state.courses)
    const token = JSON.parse(localStorage.getItem('authKey'));
    const {loading} = useSelector(state=>state.auth)
    useEffect(()=>{
       fetchCourse(id);
      
       if(token){
        alreadyEnrolled(id)
       }
       
    },[id])
   
    function fetchCourse(id){
        dispatch(updateLoading(true))
        axios.get(`/course/${id}`)
        .then((res)=>{
            dispatch(updateLoading(false))
            dispatch(updateSingleCourse(res.data.results));
            if(token){
                ExistInCart(res.data.results._id);
            }
           
        })
        .catch((err)=>{
            dispatch(updateLoading(false))
            toast.error("Something went wrong...")
        })
    }
    
    function addTocart(id){
        try{
            const token = GetAndDecode('authKey');
            if(!token){
                !state.cart && !state.enrolled ? 
                axios.post(`/user/add-to-cart/${id}`)
                .then((res)=>{
                    cartRef.current.textContent = 'Go to cart'
                    setState({...state,cart:!state.cart})
                })
                .catch((err)=>{
                    toast.error("Something went wrong...")
                })
                : state.enrolled ?
                navigate("/user/my-learning")
                :
                navigate("/user/cart")
            }
        }catch(err){
            sessionStorage.setItem('redirectURL',`/course/${id}`)
            navigate('/login',{state:{error:'Please login to continue'}});
        }
        
    }

    function ExistInCart(id){
        axios.get(`/user/cart/${id}`)
        .then((res)=>{
            if(res.data.results){
                cartRef.current.textContent = 'Go to cart';
                setState({...state,cart:!state.cart})
            }
           
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
    }


    function alreadyEnrolled(id){
        axios.get(`/user/enrolled-courses/${id}`)
        .then((res)=>{
            if(res.data.results){
                cartRef.current.textContent = "Continue Learning";
                setState({...state,enrolled:true})
            }
            
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
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

      
  return (
    <div className='h-full w-full font-poppins'>
        <ToastContainer position='top-center'></ToastContainer>
        <div className="w-full h-full xl:h-80 xl:bg-lightblue">
            <NavBar/>
            <div className="w-full h-full xl:py-5  flex flex-col xl:flex-row place-content-start xl:px-14">
                <div className='w-full xl:w-3/5  h-full flex flex-col gap-5  place-content-start p-5'>
                    <h2 className='text-xl leading-8 lg:text-3xl font-bold '>{course.course_title}</h2>
                    <h2 className='text-lg lg:text-xl font-normal '>{course.course_subtitle}</h2>
                </div>
                <div className="xl:shadow-xl bg-white xl:absolute relative xl:right-36 h-auto px-5 xl:py-8 w-full md:px-5 xl:w-96 flex-col flex gap-8 place-items-center">
                    <div className='p-3 rounded-md w-full h-60'>
                        <video className='w-full h-full' src={details.base_url+course.promotional_video} controls></video>
                    </div>
                    <div className="flex gap-3 place-content-center">
                        <p className='text-3xl font-semibold text-blue-800'>{'₹ '+course.course_sale_price}</p>
                        <p className='text-3xl font-normal line-through text-gray-600'>{'₹ '+course.course_price}</p>
                    </div>
                    <div className="w-full px-3 flex place-content-center">
                        <button className=' text-white px-5 py-3 w-full bg-secondary' onClick={()=>{addTocart(course._id)}} ref={cartRef}>Add To Cart</button>
                    </div>
                    <div className="w-full px-5 xl:px-3 flex flex-col gap-3">
                        <h2 className='text-xl font-semibold '>This course includes</h2>
                        <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><BsBook size={20} className='text-green-500'></BsBook> Language - English</li>
                        <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><MdOutlineComputer size={20} className='text-green-500'></MdOutlineComputer>Use on desktopp, mobile and laptop</li>
                        <li className='text-gray-600 font-normal list-none flex gap-3 place-items-center'><BsClockHistory size={20} className='text-green-500'></BsClockHistory>Lifetime Access</li>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col w-full h-full'>
            <div className="w-full xl:w-3/5 px-2 xl:px-5 py-4 xl:py-10 flex flex-col place-items-center">
                <Tabs value="overview" className="w-full px-5 xl:px-10">
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
                        <Tab key="reviews" value="reviews" className=' font-semibold py-3'>
                            Reviews
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
                                        <img className='w-14 h-14' src={course?.tutor?.profile_image ? details.base_url+course?.tutor?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                                    </div>
                                    <div className="flex flex-col gap-3 place-content-start">
                                        <h1 className='flex gap-3 font-poppins text-xl font-semibold text-black'>{course?.tutor?.first_name} {course?.tutor?.last_name}</h1>
                                    </div>
                                </div>
                                <p className='text-xl text-gray-600 '>{course?.tutor?.description}</p>
                            </div>
                        </TabPanel>
                        <TabPanel key="reviews" value="reviews">
                        <div className="w-full h-96">
                            <Reviews courseId={id}/>
                        </div>
                        </TabPanel>
                    
                    </TabsBody>
                    </Tabs>

            </div>
        </div>
       {
        loading &&
        <Loader/>
       }
    </div>
  )
}

export default CourseDetailPage