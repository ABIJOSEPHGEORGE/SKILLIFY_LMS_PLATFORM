import { Textarea } from '@material-tailwind/react';
import React from 'react'
import { useSelector } from 'react-redux'

function AttendAssignment() {
    const {assignmentData} = useSelector(state=>state.attendCourse);
  return (
    <div className='w-full flex flex-col place-items-center place-content-center gap-5 p-5'>
        <div className="w-full h-full flex flex-col place-content-center place-items-center">
            <div className='w-full flex flex-col gap-5 p-5'>
                <div className="flex gap-3 place-items-center">
                    <h3 className='text-lg font-semi-bold'>Assignment</h3>
                    <h3 className='text-lg font-semibold border-s-2 border-darkPink px-3'>
                    {assignmentData.title}
                    </h3>
                </div>
                <p className='text-sm font-light'>{assignmentData.description}</p>
                <div className='w-full'>
                    <Textarea label='Enter your answer' placeholder='Enter your answer for the assignment' name="assignment_answer" variant='static' color='pink'></Textarea>
                </div>
                <div className="w-full place-items-center">
                    <button className='bg-darkPink text-white font-semibold px-5 py-2 w-1/5'>Submit</button>
                </div>
            </div>
           
        </div>
    </div>
  )
}

export default AttendAssignment