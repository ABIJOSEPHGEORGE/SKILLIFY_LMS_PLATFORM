import React, { useEffect, useRef, useState,useCallback} from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Tabs, TabsHeader, Accordion, AccordionBody, AccordionHeader, Tab, TabPanel, TabsBody } from '@material-tailwind/react'
import { AiOutlineBulb } from 'react-icons/ai'
import { MdOndemandVideo } from 'react-icons/md';
import { HiDocumentDuplicate } from 'react-icons/hi';
import {ImFileVideo} from 'react-icons/im'
import { details } from '../../config';
import ReactPlayer from 'react-player'
import { debounce } from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { updateActiveProgress, updateContentTye, updateCourse, updateCourseProgress, updateToggle, updateVideoPath, updateVideoProgress } from '../../redux/attendCourseSlice';
import Discussion from './Discussion';
import axios from 'axios';
import Reviews from './Reviews';
import Notes from './Notes';
import { Link, useNavigate, useParams } from 'react-router-dom';



function AttendCourse() {

    const { toggle, course,course_progress,active_progress,video,content_type,video_progress} = useSelector((state) => state.attendCourse)
    const dispatch = useDispatch();
    const videoRef = useRef(null);

    //updating progress based on recat player
    const [isPlaying,setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [videoId,setVideoId] = useState(null)
    const playerRef = useRef(null);
    const navigate = useNavigate()
    
    

    const handleProgress = debounce((progress) => {
        axios
          .put(`/user/enroll/progress/${course?.course_id?._id}/video-progress`, {
            // session_id: sessionId,
            video_id: video.video_id,
            progress: progress.playedSeconds,
            watched: progress.playedSeconds === progress.duration,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 1000);


     

    function fetchCourseProgress(){
        axios.get(`/user/course/progress/${course?.course_id?._id}`)
        .then((res)=>{
            dispatch(updateCourseProgress(res.data.results.enrolled_course[0].completion_status));
            setContent()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    function courseProgress() {
        let completedFound = false;
        course_progress?.forEach((item) => {
          if (item.completed === true) {
            completedFound = true;
          } else if (completedFound === false) {
            dispatch(updateActiveProgress({ session: item.section, content: item.active_content }));
            completedFound = true;
          }
        });
        
      }

      

     function setContent(){
        course?.course_id?.curriculum?.forEach((ele,index)=>{
            if(active_progress.session-1===index){
                dispatch(updateContentTye(ele?.content[active_progress.content-1].content_type));
                if(ele?.content[active_progress.content-1].content_type==="lecture"){
                    
                    dispatch(updateVideoPath({video_path:ele?.content[active_progress.content-1].video_path,video_id:ele?.content[active_progress.content-1].video_id}))
                    setVideoId(ele?.content[active_progress.content-1].video_id)
                }
            }
        })
        
    }
    
    

    const handleVideoEnded = () => {
        const video = videoRef.current;
        const duration = video.duration;
        const currentTime = video.currentTime;
        const threshold = 0.5; // in seconds
    
        if (duration - currentTime <= threshold) {
        //   updateProgress()
        }
      };

      
    // function updateProgress(){
    //     console.log(course_progress)
    //     if(course_progress.active_content===course_progress.total_content){
    //         dispatch(updateCourseProgress({...course_progress,completed:true}))
    //     }else{
    //         dispatch(updateCourseProgress({...course_progress,active_content:course_progress.active_content+1}))
    //     }
    //     courseProgress()
    //     setContent()
    //     console.log(course_progress)
    //     //   axios.put('/users/enrolled-course/progress/:id')
    //     //   .then((res)=>{

    //     //   })
    //     //   .catch((err)=>{

    //     //   })
    //     alert("hello")
    // }
   

    function videoProgress(video){
        axios.get(`/user/enroll/video-progress/${course?.course_id?._id}/${video.video_id}`)
        .then((res) => {
            
            dispatch(updateVideoProgress(res.data.results))
            setProgress(res.data.results.progress)
            playerRef?.current.seekTo(res.data.results.progress)
        })
        .catch((err) => {
            console.log(err) 
        })
    }
    
    
    fetchCourseProgress()
    videoProgress(video)
    const [open, setOpen] = useState(active_progress.session-1);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    }
    const [contOpen, setContOpen] = useState(active_progress.content-1);

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
    
    return (
        <div className='absolute top-0 left-0 z-50 w-full h-full font-poppins'>
            <div className="w-full flex flex-col place-items-center p-5 h-auto">
                <div className="w-full p-5 flex place-content-evenly place-items-center">
                    <div className="w-[15%] border-r-2 border-darkPink flex  place-content-start place-items-center">
                        <h1 className='text-xl font-semibold'>Skillify</h1>
                    </div>
                    <div className="w-[70%] flex  place-content-between place-items-center px-3">
                        <h1 className='text-xl font-semibold'>{course?.course_id?.course_title}</h1>
                        <h2 className='text-darkPink font-semibold text-md'>Completed : {course?.progress}%</h2>
                    </div>
                    <div className='w-[15%] flex  place-items-center place-content-end'>
                        <Link to="/user/my-learning" className="flex flex-col place-content-center place-items-center cursor-pointer">
                            <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
                            <h3 className='text-md font-semibold'>Exit</h3>
                        </Link>
                    </div>
                </div>
                <div className="w-full flex gap-2 h-full py-5">
                    <div className="w-3/4 flex flex-col">
                    {/* <video className='w-full h-full' ref={videoRef}  onEnded={handleVideoEnded} src={details.base_url+video_path   } controls controlsList="nodownload"></video> */}
                        
                            <ReactPlayer width="1080px" height="960px" url={details.base_url+video?.video_path} controls={true} config={{
                                file: {
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                                }
                                
                                }}
                                ref={playerRef}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onProgress={(progress) => {
                                    if(isPlaying){
                                        handleProgress(progress)
                                    }
                                    
                                }}
                               
                            />
                        
                        
                    
                    
                        <div className='w-full h-full'>
                                <div className='flex flex-col w-full h-full'>
                                    {
                                        course?.progress < 5 &&
                                        <div className='w-full py-10 flex gap-3 place-items-center place-content-center'>
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
                                    <div className="w-full flex gap-3">

                                        <Tabs value="overview" className="w-full">
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
                                                    Discussion
                                                </Tab>
                                                <Tab key="notes" value="notes" className='font-normal font-poppins py-3'>
                                                    Notes
                                                </Tab>
                                                <Tab key="announcements" value="announcements" className='font-normal font-poppins py-3'>
                                                    Announcements
                                                </Tab>
                                                <Tab key="instructor" value="instructor" className='font-normal font-poppins py-3'>
                                                    Instructor
                                                </Tab>
                                                <Tab key="reviews" value="reviews" className='font-normal font-poppins py-3'>
                                                    Reviews
                                                </Tab>

                                            </TabsHeader>
                                            <TabsBody>

                                                <TabPanel key="overview" value="overview">
                                                    <div className='w-full h-full mt-5'>
                                                        <h1 className='text-xl font-semibold text-black font-poppins'>Course Description</h1>
                                                        <p className='text-gray-700'>{course?.course_id?.course_description}</p>
                                                    </div>
                                                </TabPanel>

                                                <TabPanel key="curriculum" value="curriculum">
                                                    <div className="w-4/5 flex flex-col place-items-center gap-3">
                                                        <Discussion courseId={course?.course_id?._id}/>
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
                                                <TabPanel key="notes" value="notes">
                                                    <div className="w-full h-96">
                                                         <Notes courseId={course?.course_id._id}/>
                                                    </div>
                                                    
                                                </TabPanel>
                                                <TabPanel key="reviews" value="reviews">
                                                    <div className="w-full h-96">
                                                         <Reviews courseId={course?.course_id._id}/>
                                                    </div>
                                                    
                                                </TabPanel>

                                            </TabsBody>
                                        </Tabs>
                                                
                                        
                                    </div>
                                </div>
                            </div>
            
                    </div>
                   


                    
                    <div className="w-1/4 flex flex-col bg-white shadow-xl absolute right-0  place-items-center h-full">
                        
                        <h2 className='text-xl font-semibold text-center p-3'>Course Content</h2>
                        <div className="w-full bg-white flex flex-col gap-3 ">
                            {
                                course?.course_id?.curriculum?.map((section, index) => (
                                    <Accordion key={index} open={open === index} icon={<Icon id={index} open={open} />} className='bg-white px-5'>
                                        <AccordionHeader onClick={() => handleOpen(index)} className='text-sm text-start font-semibold font-poppins capitalize tracking-wider'>
                                            {section.title}
                                        </AccordionHeader>
                                        <AccordionBody>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-gray-600 font-light text-md font-poppins'>{section.description}</p>

                                                {
                                                    section?.content?.map((content, cindex) => (
                                                        <AccordionBody className="font-poppins">

                                                        <div className="w-full flex flex-col gap-2">
                                                                <div className={active_progress.content-1===cindex && active_progress.session-1===index ? 'flex place-items-center gap-3 bg-lightblue p-3 cursor-pointer' : 'flex place-items-center gap-2 cursor-pointer hover:bg-lightblue p-3'}>
                                                                   <div>
                                                                    <MdOndemandVideo size={20}></MdOndemandVideo>
                                                                   </div>
                                                                    <h3 className=' font-semibold  px-2 text-sm'>{content.title}</h3>
                                                                    
                                                                </div>
                                                        </div>
                                                        
                                                    </AccordionBody>
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


            
        </div>
    )
}

export default AttendCourse