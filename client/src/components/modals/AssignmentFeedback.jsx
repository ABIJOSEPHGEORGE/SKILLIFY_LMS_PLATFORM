import { Textarea } from '@material-tailwind/react'
import { useFormik } from 'formik';
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { assignmentFeedback } from '../../validations/FormValidations';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function AssignmentFeedback({toggle,setToggle,load}) {
    const {payload} = toggle;

    const {handleSubmit,handleBlur,handleChange,touched,errors} = useFormik({
        initialValues:{
            feedback:''
        },
        validationSchema:assignmentFeedback,
        onSubmit:(values)=>{
            updateAssignment(values)
        }
    })

    

    async function updateAssignment(values){
        try{
           const res =  await axios.put(`/instructor/assignment/update/${payload._id}`,values);
            toast.success("Feedback Submitted");
            setToggle({toggle:false,payload:null})
            load()
        }catch(err){
            toast.error("Something went wrong...")
        }
    }

  return (
    <div className='w-full h-full flex flex-col place-items-center place-content-center bg-black absolute top-0 left-0 bg-opacity-5'>]
        <ToastContainer limit={2} position='top-center'></ToastContainer>
        <div className=" w-2/5  rounded-lg p-5 bg-white flex flex-col place-content-center place-items-start">
            <div className="w-full flex place-content-end">
                <AiOutlineCloseCircle size={20} className=" cursor-pointer" onClick={()=>setToggle({...payload,toggle:false})}></AiOutlineCloseCircle>
            </div>
            <div className="w-full flex flex-col gap-3">
                <h2><span className='font-semibold'>Title :</span> {payload?.title}</h2>
                <p><span className='font-semibold'>Description : </span>{payload?.description}</p>
                <p><span className='font-semibold'>Student :</span> {payload.user}</p>
                <div className="flex flex-col gap-1">
                    <p className='font-semibold'>Answer</p>
                    <p className='text-sm font-normal'>{payload?.answer}</p>
                </div>
                
                <form className='flex flex-col gap-3 ' onSubmit={handleSubmit}>
                    <Textarea label='Feedback' variant='static' placeholder='Enter your feedback' name='feedback' defaultValue={payload?.feedback ? payload.feedback : ""} onChange={handleChange} onBlur={handleBlur}/>
                    {
                        errors.feedback && touched.feedback &&
                        <p className='text-sm text-red-500'>{errors.feedback}</p>
                    }
                    <div className="w-full flex place-content-center">
                        <button className="bg-primaryBlue text-white px-3 py-2 rounded-3xl w-1/5" type='submit'>Submit</button>
                    </div>
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default AssignmentFeedback