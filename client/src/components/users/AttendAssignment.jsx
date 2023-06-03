import { Textarea } from '@material-tailwind/react';
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {useFormik} from 'formik'
import { assignmentSchema } from '../../validations/FormValidations';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AttendAssignment({progressPercentage,renderActiveContent}) {
    const {assignmentData,active,content} = useSelector(state=>state.attendCourse);
    const {id} = useParams()
    const [assignmentStatus,setAssignmentStatus] = useState(null);
    const [feedback,setFeedback] = useState('')
    const [status,setStatus] = useState(false)

    useEffect(()=>{
        fetchAssignmentProgress()
    },[assignmentData])

    
    


    const {handleChange,handleBlur,handleSubmit,values,errors,touched,handleReset} = useFormik({
        initialValues:{
            answer:'',
        },
        validationSchema:assignmentSchema,
        onSubmit:values=>{
            values.question = assignmentData.title;
            values.description = assignmentData.description;
            submitAssignment(values)
        }
    })

    useEffect(()=>{
        handleReset()
    },[assignmentData])

    async function submitAssignment(values){
        const current_session = active.currentSession;
        const session_id = content[current_session?.index].session_id;
        try{
            await axios.put('/user/enroll/course-content/status',{courseId:id,contentId:assignmentData?.assignment_id,
            contentType:"assignment",sessionId:session_id,payload:values})
            await Promise.all([
                progressPercentage(),
                renderActiveContent()
            ])
        }catch(err){
            toast.error("Something went wrong...")
        }
    }

    async function fetchAssignmentProgress(){
        const current_session = active.currentSession;
        console.log(active)
        console.log(content)
        const session_id = content[current_session?.index]._id;
        try{
           const res = await axios.get(`/user/assignment/status/${id}/${session_id}/${assignmentData?.assignment_id}`)
            if(res.data.results.completed && res.data.results.status){
                setAssignmentStatus(true);
                setFeedback(res.data.results.feedback);
                setStatus(true)
            }else if(res.data.results.completed && !res.data.results.status){
                setAssignmentStatus(true)
            }else{
                setAssignmentStatus(false);
            }
        }catch(err){
            toast.error("Something went wrong...")
        }
    }
  return (
    <div className='w-full flex flex-col place-items-center place-content-center gap-5 p-5'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
        <div className="w-full h-full flex flex-col place-content-center place-items-center">
            <div className='w-full flex flex-col gap-5 p-5'>
                <div className="flex gap-3 place-items-center">
                    <h3 className='text-lg font-semi-bold'>Assignment</h3>
                    <h3 className='text-lg font-semibold border-s-2 border-darkPink px-3'>
                    {assignmentData.title}
                    </h3>
                </div>
                <p className='text-sm font-light'>{assignmentData.description}</p>
                {
                    assignmentStatus===false && assignmentData ?

                    <form className='w-full' onSubmit={handleSubmit}>
                    
                    <div className='w-full'>
                        <Textarea label='Enter your answer' placeholder='Enter your answer for the assignment' name="answer" value={values.answer} onChange={handleChange} onBlur={handleBlur} variant='static' color='pink'></Textarea>
                        {
                            errors.answer && touched.answer &&
                            <p className='text-sm text-red-500'>{errors.answer}</p>
                        }
                    </div>
                    <div className="w-full place-items-center">
                        <button className='bg-darkPink text-white font-semibold px-5 py-2 w-1/5' type='submit'>Submit</button>
                    </div>
                        
                    </form>

                    : assignmentStatus ?
                    
                    <div className='w-full p-5 flex flex-col place-items-center place-content-start'>
                        <img className='w-1/5'  src="/gif/completed.gif" alt="completed" />
                        <h3 className='font-semibold text-sm text-darkPink text-center'>Successfully Submitted</h3>
                        {
                            status ?
                            <div className='w-full flex flex-col gap-3 place-items-start'>
                                <p className='flex gap-3 text-sm font-normal'><span className='font-semibold text-md'>Status</span> : Your assignment has been reviewed by the instructor</p>
                                <p className='flex gap-3 text-sm font-normal'><span className='font-semibold text-md'>Feedback</span> : {feedback}</p>
                            </div>  
                            :
                            <div className='w-full flex flex-col gap-3 place-items-center'>
                                <p className='flex gap-3 text-sm font-normal'><span className='font-semibold text-md'>Status</span> : Your assignment not yet reviewed by the instructor</p>
                            </div>
                        }
                    </div>

                    :
                    <div className='w-full p-5 flex flex-col place-items-center place-content-start'>
                        <img className='w-1/5'  src="/gif/loading.gif" alt="loading" />
                        <h3 className='font-semibold text-sm text-darkPink text-center'>Please wait while we are loading the content for you...</h3>
                    </div>
                }
            </div>
           
        </div>
    </div>
  )
}

export default AttendAssignment