import React, { useEffect,useState } from 'react'
import NavBar from '../../components/users/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { updateMyLearning } from '../../redux/course';
import { details } from '../../config';
import { Progress } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import AttendCourse from '../../components/users/AttendCourse';
import { updateCourse, updateToggle } from '../../redux/attendCourseSlice';

function MyLearning() {
    const dispatch = useDispatch();
    const {toggle,course} = useSelector((state)=>state.attendCourse)
    const {enrolled_courses} = useSelector((state)=>state.courses)
    useEffect(()=>{
        axios.get('/user/enrolled-courses')
        .then((res)=>{
            dispatch(updateMyLearning(res.data.results))
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    function attendCourse(id){
        
        const course = enrolled_courses.filter((course)=>{
            return course ? course?.course_id._id === id : null;
        });
        dispatch(updateCourse(course[0]))
        dispatch(updateToggle(!toggle));
        
    }



  return (
    <>
    {
    !toggle ?
    <div className='w-full h-full font-poppins'>
        <div className="w-full h-34 bg-lightblue flex flex-col place-content-between">
            <NavBar/>
            <div className="w-full px-5 py-3">
                <h1 className='text-4xl font-semibold font-poppins text-center'>My Learning</h1>
            </div>
        </div>
        {
            enrolled_courses.length > 0 ?
            <div className="w-full flex gap-5 p-10">
            {
                enrolled_courses.map((course,index)=>(
                    <div className="w-1/5 bg-white shadow-xl p-3 rounded-md flex flex-col gap-3 place-content-between place-items-center">
                        <div className="w-full h-64 p-2">
                            <img src={details.base_url+course?.course_id?.course_image} className='rounded-md' alt="course_image" />
                        </div>
                        <h1 className='font-semibold text-md'>{course?.course_id?.course_title}</h1>
                        <div className=" w-full flex flex-col">
                            <label htmlFor="progress">{course?.progress}% completed</label>
                            <Progress value={course?.progress} id='progress' color="pink" />
                        </div>
                        
                        <div className="w-full flex place-content-start m-0">
                            <button className='bg-darkPink text-white text-center px-4 py-3' onClick={()=>{attendCourse(course?.course_id?._id)}}>{course?.progress>0 ? 'Continue Learning' : 'Start Learning'}</button>
                        </div>
                            
                            </div>
                        ))
                    }
                    
                </div>
            :
            <div className="w-full p-2 flex flex-col gap-3 place-items-center place-content-center">
                <img src="/no-enrolled-course.gif" className='w-1/5' alt="course_image" />
                <h2 className='text-2xl font-semibold'>Not yet enrolled any courses ?</h2>
                <div className="w-full flex place-content-center">
                    <Link to="/courses" className='bg-darkPink text-white text-center px-4 py-3 rounded-md'>Browse Courses</Link>
                </div>
            </div>
        }
        
    </div>
    :
    <AttendCourse />
    }
    </>
  )
}

export default MyLearning