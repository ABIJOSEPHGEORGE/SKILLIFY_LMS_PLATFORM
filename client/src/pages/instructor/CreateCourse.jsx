import React,{useState} from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import { useFormik } from 'formik';
import CourseFormOne from '../../components/instructors/CourseFormOne';
import { Navigate } from 'react-router-dom';
import CourseFormTwo from '../../components/instructors/CourseFormTwo';
import CourseFormThree from '../../components/instructors/CourseFormThree';

function CreateCourse() {
    const [activeStep,setActiveStep] = useState(0);
    const formik = useFormik({
        initialValues:{
            course_title:'',
            cousrse_subtitle:'',
            course_description:'',
            category:'',
            sub_category:'',
            course_image:'',
            promotional_video:'',
            curriculum:[],
            course_price:'',
            course_sale_price:'',
            welcome_message:'',
            completion_message:''
        }
    })
    function handleBack(){
        setActiveStep((prev)=>prev-1)
    }
    function handleNext(){
        setActiveStep((prev)=>prev+1)
    }
    const formContent = (step)=>{
        switch(step){
            case 0:
                return <CourseFormOne formik={formik}/>
            case 1:
                return <CourseFormTwo formik={formik}/>
            case 2:
                return <CourseFormThree formik={formik}/>
            default:
                return <Navigate to="/instructor/dashboard"/>
        }
    }
  return (
    <div className='flex w-full h-full'>
        <SideMenu/>
        <div className="w-full">
            <form className='w-full h-4/5 flex flex-col place-content-start place-items-start px-20'>
                {formContent(activeStep)}
            </form>
            <div className='w-full flex place-content-center px-20'>
                    <div className={activeStep>0 ? "flex place-content-between w-full" : "flex place-content-end w-full"}>
                        {activeStep>0 ? 
                            <button className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleBack}>Back</button>
                            : null
                        }

                        {activeStep!==2 ? <button className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleNext}>Next</button>
                        :
                        <button type='button' className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={formik.handleSubmit}>Submit</button>
                        }
                        
                    </div>
                       
                </div>
        </div>
        
    </div>
  )
}

export default CreateCourse