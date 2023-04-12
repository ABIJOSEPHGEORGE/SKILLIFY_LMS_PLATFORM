import React,{useState} from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import { useFormik } from 'formik';
import CourseFormOne from '../../components/instructors/course/CourseFormOne';
import { useNavigate,Navigate } from 'react-router-dom';
import CourseFormTwo from '../../components/instructors/course/CourseFormTwo';
import CourseFormThree from '../../components/instructors/course/CourseFormThree';
import { courseSchema } from '../../validations/FormValidations';
import { ToastContainer, toast } from 'react-toastify';
import  {useDispatch, useSelector} from 'react-redux'
import CourseFormFour from '../../components/instructors/course/CourseFormFour';
import axios from 'axios';
import { resetState } from '../../redux/createCourse';

function CreateCourse() {
    const [activeStep,setActiveStep] = useState(0);
    const dispatch = useDispatch()
    const {course_image,section,promo_video} = useSelector((state)=>state.createCourse)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            course_title:'',
            course_subtitle:'',
            course_description:'',
            category:'',
            sub_category:'',
            course_image:'',
            promotional_video:'',
            curriculum:'',
            course_price:'',
            course_type:'',
            course_sale_price:'',
            course_welcome_message:'',
            course_completion_message:''
        },
        validationSchema:courseSchema,
        onSubmit:(values)=>{
            values.course_image = course_image
            values.promotional_video = promo_video
            values.curriculum = JSON.stringify(section);
            console.log(values)
            const form = new FormData()
            for (const key in values) {
                form.append(key, values[key]);
              }
            
            function createCourse(form){
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
            createCourse(form)
        }
    })
    function handleBack(){
        setActiveStep((prev)=>prev-1)
    }
    function handleNext(){
        if(Object.keys(formik.errors).length!==0){
            console.log(formik.errors)
            toast.error('Please fill all required fields')
        }else{
            setActiveStep((prev)=>prev+1)
        }
    }
    const formContent = (step)=>{
        switch(step){
            case 0:
                return <CourseFormOne formik={formik}/>
            case 1:
                return <CourseFormTwo formik={formik}/>
            case 2:
                return <CourseFormThree formik={formik}/>
            case 3:
                return <CourseFormFour formik={formik}/>
            default:
                return <Navigate to="/instructor/dashboard"/>
        }
    }
  return (
    <div className='flex w-full h-auto'>
        <SideMenu/>
        <div className="w-full h-auto flex flex-col place-content-center">
            <ToastContainer position='top-center' limit={3}></ToastContainer>
            <form className='w-full h-auto flex flex-col place-content-start place-items-start px-20'>
                {formContent(activeStep)}
            </form>
            <div className='w-full py-4 flex place-content-center px-20'>
                    <div className={activeStep>0 ? "flex place-content-between w-full" : "flex place-content-end w-full"}>
                        {activeStep>0 ? 
                            <button className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleBack}>Back</button>
                            : null
                        }

                        {activeStep!==3 ? <button className='bg-primaryBlue px-4 py-3 text-center text-white font-semibold w-[25%]' onClick={handleNext}>Next</button>
                       
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