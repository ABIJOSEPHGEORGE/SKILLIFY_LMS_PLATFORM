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
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { updateMyLearning } from '../../redux/course';








function AttendCourse() {

    const { toggle, course,course_progress,active_progress,video_progress,quiz_progress,assignment_progress} = useSelector((state) => state.attendCourse)
    const dispatch = useDispatch();
    const videoRef = useRef(null)

    //updating progress based on recat player
    const [isPlaying,setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [video,setVideo] = useState(null)
    const playerRef = useRef(null);
    const navigate = useNavigate()
    const {id} = useParams()
    const [active,setActive] = useState({})
    const [content,setContent] = useState([])
    const [duration,setDuration] = useState(0)
    const [seek,setSeek] = useState(false)
    
    useEffect(()=>{
        isCourseEnrolled()  
        courseProgress()  
    },[dispatch])

    useEffect(()=>{
        fetchActiveSession();
    },[id]);

    useEffect(()=>{
        fetchCourseContent()
    },[active])

    

    // useEffect(()=>{
    //     playerRef?.current.progress(progress)
    //     console.log(progress)
    // },[progress])
    
    

    function isCourseEnrolled(){
        axios.get('/user/enrolled-courses')
        .then((res)=>{
            dispatch(updateMyLearning(res.data.results))
            const isEnrolled = res.data.results.filter((course)=>{
                return course ? course?.course_id._id === id : null;
            });
            
            if(isEnrolled.length===0){
                navigate('/user/my-learning',{replace:true})
            }else{
                dispatch(updateCourse(isEnrolled[0]));
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    
    

    const handleProgress = debounce((progress) => {
        console.log(duration,'======')
        axios
          .put(`/user/enroll/progress/${id}/video-progress`, {
            // session_id: sessionId,
            video_id: video.video_id,
            progress: progress.playedSeconds,
            watched: progress.playedSeconds === progress.duration,
            total_duration : duration,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
         
      }, 1000);

    function fetchActiveSession(){
        axios.get(`/user/course/active-session/${id}`)
        .then((res)=>{
            setActive(res.data.results)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    //gettingthe active content
    async function fetchCourseContent(){
        console.log(active)
        await axios.get(`/user/course/content/${id}/`)
        .then((res)=>{
           setContent(res.data.results);
           
        })
        .catch((err)=>{
            console.log(err)
        })

        videoProgress()
        renderActiveContent()
    }

    const renderActiveContent=()=>{
        const current_session = active.currentSession;
        const current_content = content[current_session?.index].content[current_session?.active_content-1];

        //check content type
        setVideo({video_path:current_content?.video_path,video_id:current_content?.video_id,content_id:current_content?._id})
    }


    async function videoProgress(){
        const current_session = active.currentSession;
        const current_content = content[current_session?.index].content[current_session?.active_content-1]
        try{
            const res = await axios.get(`/user/enroll/video-progress/${id}/${current_content.video_id}`)
            if(res.data.results.found===false){
                playerRef.current.seekTo(0);
                // dispatch(updateVideoProgress(res.data.results))
                setProgress(0)  
                return
            }
            playerRef.current.seekTo(res.data.results.progress);
            // dispatch(updateVideoProgress(res.data.results))
            setProgress(res.data.results.progress)
            
        }catch(err){
            console.log(err) 
        }
    }
    
    
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

   
    const videoPercentage=()=>{
        const totalDuration = playerRef.current.getDuration();
        console.log(progress)
        const percentage = (progress/totalDuration)*100;
        console.log(percentage,'=======')
    }

    
    const loadContent=async(content)=>{
       setVideo({video_path:content.video_path,video_id:content.video_id})   
       const res = await axios.get(`/user/enroll/video-progress/${id}/${content.video_id}`)        
            if(res.data.results.found===false){
                playerRef.current.seekTo(0);
                // dispatch(updateVideoProgress(res.data.results))
                setProgress(0)  
                return
            }else{
                playerRef.current.seekTo(res.data.results.progress);
                // dispatch(updateVideoProgress(res.data.results))
                setProgress(res.data.results.progress)
            }
             
    }

    function handleDuration(duration){
        
        setDuration(duration)
    }

    function courseProgress(){
        axios.get(`/user/course/progress/${id}`)
        .then((res)=>{

           const video_completion =  res.data.results?.enrolled_course[0].video_progress.map((video,index)=>{
                    return {
                        video_id : video.video_id,
                        completed:video.completed,
                        percentage:video.progress > 0 ? (video.progress/video.total_duration) : 0,
                    }
            })

            dispatch(updateVideoProgress(video_completion));
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function handleOnSeek(){
        setSeek(true)
    }

    function handleVideoEnded(){
        const current_session = active.currentSession;
        const session_id = content[current_session?.index].session_id
        axios.put('/user/enroll/course-content/status',{courseId:id,contentId:video?.video_id,contentType:"lecture",sessionId:session_id})
        .then((res)=>{
            console.log(res,'ended++++++++++++')
        })
        .catch((err)=>{
            console.log(err)
        })
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
                                onReady={()=>{
                                    if(!isPlaying && !seek){
                                        playerRef.current.seekTo(parseFloat(progress),'seconds')
                                    }
                                }}
                                
                                onSeek={handleOnSeek}
                                
                                onDuration={handleDuration}
                                
                               onEnded={handleVideoEnded}
                            />
                            
                            
                        
                        
                    
                    
                        <div className='w-full h-full'>
                                <div className='flex flex-col w-full h-full'>
                                    {/* {
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
                                    } */}
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

                                                        <div className="w-full flex flex-col gap-2" onClick={()=>{loadContent(content)}}>
                                                                <div className={content?.video_path === video?.video_path ? 'flex place-items-center gap-3 bg-lightblue p-3 cursor-pointer' : 'flex place-items-center gap-2 cursor-pointer hover:bg-lightblue p-3'}>
                                                                   <div>
                                                                    <MdOndemandVideo size={20}></MdOndemandVideo>
                                                                   </div>
                                                                    <h3 className=' font-semibold  px-2 text-sm'>{content.title}</h3>
                                                                  
                                                                    <p className='text-green-500 font-semibold hidden'>Completed</p>
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