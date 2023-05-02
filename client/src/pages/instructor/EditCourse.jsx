import React,{useEffect, useState} from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import { useFormik } from 'formik';
import CourseFormOne from '../../components/instructors/course/CourseFormOne';
import { useNavigate,Navigate, useSearchParams } from 'react-router-dom';
import CourseFormTwo from '../../components/instructors/course/CourseFormTwo';
import CourseFormThree from '../../components/instructors/course/CourseFormThree';
import { CourseCreationValidation, courseSchema } from '../../validations/FormValidations';
import { ToastContainer, toast } from 'react-toastify';
import  {useDispatch, useSelector} from 'react-redux'
import CourseFormFour from '../../components/instructors/course/CourseFormFour';
import axios from 'axios';
import { resetState, updateError, updateFormData } from '../../redux/createCourse';

function EditCourse() {
    const [activeStep,setActiveStep] = useState(0);
    const dispatch = useDispatch()
    const [params] = useSearchParams();
    const courseId = params.get('id')
    console.log(courseId)
    const {formData,error} = useSelector((state)=>state.createCourse)
    const navigate = useNavigate()
    console.log(formData)
    useEffect(()=>{
        axios.get(`/course/${courseId}`)
        .then((res)=>{
            res.data.results.edit_mode = true;
            res.data.results.isFree ? res.data.results.course_type="free" : res.data.results.course_type ="premium"
            dispatch(updateFormData(res.data.results))
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    function handleBack(){
        setActiveStep((prev)=>prev-1)
    }
   function handleNext(){
    
        const response = CourseCreationValidation(formData,activeStep)
        if(response){
            dispatch(updateError({...response}))
        }else{
            setActiveStep((prev)=>prev+1)
        }
    }
    
    function handleSubmit(){
        const form = new FormData()
        for (const key in formData) {
            if(key==='curriculum'){
                form.append(key,JSON.stringify(formData[key]))
            }else if(key==='reviews'){
                form.append(key,JSON.stringify(formData[key]))
            }else if(key==='tutor'){
                form.append(key,JSON.stringify(formData[key]))
            }
            else{
                form.append(key, formData[key]);
            }
            
        }
        if(formData.edit_mode){
            console.log(formData)
            
            axios.put(`/instructor/course/edit-course/${courseId}`,form)
            .then((res)=>{
                dispatch(resetState())
                navigate('/instructor/courses');
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })
        }else{
            axios.post('/instructor/course/create-course',form)
            .then((res)=>{
                if(res.status===200){
                    dispatch(resetState())
                    navigate('/instructor/courses');
                }
            })
            .catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
        
    }
    const formContent = (step)=>{
        switch(step){
            case 0:
                return <CourseFormOne />
            case 1:
                return <CourseFormTwo />
            case 2:
                return <CourseFormThree />
            case 3:
                return <CourseFormFour />
            default:
                return <Navigate to="/instructor/dashboard"/>
        }
    }
  return (
    <div className='flex w-full h-auto'>
        <SideMenu/>
        <div className="w-full h-auto flex flex-col place-content-center shadow-xl rounded-md m-5" >
            <ToastContainer position='top-center' limit={3}></ToastContainer>
            <div className='w-full h-auto flex flex-col place-content-start place-items-start px-20'>
                {formContent(activeStep)}
            </div>
            <div className='w-full py-4 flex place-content-center px-20'>
                    <div className={activeStep>0 ? "flex place-content-between w-full" : "flex place-content-end w-full"}>
                        {activeStep>0 ? 
                            <button className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleBack}>Back</button>
                            : null
                        }

                        {activeStep!==3 ? <button className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleNext}>Next</button>
                       
                        :
                        <button type='button' className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={()=>{handleSubmit()}}>Submit</button>
                        }
                        
                    </div>
                       
                </div>
        </div>
        
    </div>
  )
}

export default EditCourse