import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Input,Textarea } from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import { editLecture, editSectionDetails, getQuiz, updateFormData, updateLecture, updateQuizData, updateSection } from "../../redux/createCourse"
import { AiFillDelete, AiOutlineClose, AiOutlineCloseCircle,AiOutlinePlus } from "react-icons/ai"
import { useState } from "react"
import { MdDelete } from "react-icons/md"
import {useFormik} from 'formik'
import { details } from "../../config"
import {BsFillPlayCircleFill} from 'react-icons/bs'
import { Link } from "react-router-dom"
import { CiEdit } from "react-icons/ci"
import { lectureSchema, lectureValidation, videoValidation } from "../../validations/FormValidations"
import axios from "axios"


const EditSection=({setToggle,toggle})=>{
    
    useEffect(()=>{
        window.scrollTo(0,0)
        return()=>{
            window.scrollTo(0,toggle.scroll)
        }
    },[])
 
    const dispatch = useDispatch()
    const {formData} = useSelector((state)=>state.createCourse)
    const [details,setDetails] = useState({title:formData.curriculum[toggle.index].title,description:formData.curriculum[toggle.index].description});
    function updateSectionDetails(){
        dispatch(editSectionDetails({sec_index:toggle.index,title:details.title,description:details.description}));
        setToggle({...toggle,toggleEdit:false});
    }

    //const section = formData.curriculum[index];
    return(
    <div className={`w-full absolute top-0 flex flex-col place-content-center place-items-center bg-black bg-opacity-5 z-50 left-0 h-screen`}>
        <div className="w-3/5  flex place-items-center place-content-center">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ ease: "easeOut", duration: 0.5 }} className="bg-white w-full p-5 gap-6 flex flex-col place-content-around shadow-xl rounded-xl my-3" >
                <div className="w-full flex place-content-end">
                    <AiOutlineCloseCircle size={20} className=" cursor-pointer" onClick={()=>{setToggle({...toggle,toggleEdit:false})}}></AiOutlineCloseCircle>
                </div>
                <h2 className="text-center font-semibold text-primaryBlue text-xl">Edit Section</h2>
                <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                <Input label='Section Title' variant='static' type='text' name="section_title"   value={details.title} onChange={(e)=>setDetails({...details,title:e.target.value})}  placeholder="Enter the section title"></Input>
                </div>
                <div className='w-full flex flex-col place-items-start place-content-center'>
                <Textarea label='Section description' variant='static' type='text' name="section_description"  value={details.description} onChange={(e)=>setDetails({...details,description:e.target.value})} placeholder="Enter the section description"/>
                </div>
                
                <div className="w-full text-center">
                    <button className="text-white bg-primaryBlue rounded-3xl px-8 py-3 w-2/5" onClick={(e)=>{updateSectionDetails()}}>Update</button>
                </div>
            </motion.div>
        </div>
    </div>
    )
    
}

const EditAssignment=({setEditToggle,editToggle})=>{
    const {lecture_content} = editToggle;
    const dispatch = useDispatch()
    const {handleSubmit,handleBlur,handleChange,errors,touched,values} = useFormik({
        initialValues:{
            title:lecture_content?.title,
            description:lecture_content?.description,
        },
        validationSchema:lectureSchema,
        onSubmit:(values)=>{
            const assignment = {title:values.title,description:values.description,content_type:"assignment"}
            dispatch(editLecture({sec_index:editToggle.index,con_index:editToggle.cindex,content:assignment}))
            setEditToggle({...editToggle,lecture_edit:false})
        }
    })
    return(
        <div className={`w-full h-full absolute top-0 bottom-0 flex flex-col place-items-center place-content-center  bg-black bg-opacity-20 z-50 left-0`}>
        <div className={`bg-white shadow-xl p-5 w-3/6 rounded-lg flex flex-col gap-6 font-poppins`}>
            <div className="w-full flex place-content-end place-items-center cursor-pointer" onClick={()=>{setEditToggle({...editToggle,lecture_edit:false})}}>
                <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
            </div>
            <h2 className="text-center text-primaryBlue font-semibold text-xl">Edit Assignment</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                    <Input label="Title" variant="static" name="title" color="gray" defaultValue={editToggle?.lecture_content?.title} value={values.title} onChange={handleChange} onBlur={handleBlur}/>
                    {
                        errors?.title && touched?.title &&
                        <p className='text-red-500 font-normal text-sm font-poppins'>{errors?.title}</p>
                    }
                </div>
                <div>
                    <Textarea label="Description" variant="static" color="gray" name="description"  defaultValue={editToggle?.lecture_content?.description} onChange={handleChange} value={values.description} onBlur={handleBlur} className="scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100" />
                    {
                        errors?.description && touched?.description &&
                        <p className='text-red-500 font-normal text-sm font-poppins'>{errors?.description}</p>
                    }
                </div>
                
                
                <div className="w-full text-center">
                    <button className="text-white bg-primaryBlue rounded-3xl px-8 py-3 w-2/5" type="submit">Update</button>
                </div>
             </form>
        </div>
    </div>
    )
}

const EditQuiz = ({ editToggle, setEditToggle }) => {
    const { lecture_content, index, cindex } = editToggle;
    const dispatch = useDispatch();
    const { formData } = useSelector((state) => state.createCourse);
    let quizData =  formData.curriculum[index].content[cindex];
    useEffect(() => {
      dispatch(getQuiz({ sec_index: index, con_index: cindex }));
    }, []);
    const [quizCopy, setQuizCopy] = useState(quizData);
    
   
const handleNewOption = (index) => {
    const options = [...quizCopy.questions[index].options];
    options.push({ answer: '', isCorrect: false });
  
    const newQuestion = {
      ...quizCopy.questions[index],
      options: options,
    };
  
    const newQuestionsArray = [...quizCopy.questions];
    newQuestionsArray[index] = newQuestion;
  
    const newQuizCopy = {
      ...quizCopy,
      questions: newQuestionsArray,
    };
  
    // Update the quizCopy object with the new question object
    setQuizCopy(newQuizCopy);
  };

  const handleDeleteOption = (index, oindex) => {
    const questions = [...quizCopy.questions];
    const options = [...questions[index].options];
    options.splice(oindex,1)
    
    questions[index] = {
      ...questions[index],
      options: options,
    };

    const newQuizCopy = {
      ...quizCopy,
      questions: questions,
    };
    setQuizCopy(newQuizCopy);
    
  };

  const handleDeleteQuestion=(index)=>{
    const questions = [...quizCopy.questions];
    questions.splice(index,1);

    const newQuizCopy = {
        ...quizCopy,
        questions:questions
    };
    setQuizCopy(newQuizCopy)
  }

    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      // Access the form values directly from the event.target object
      const formValues = {
        title: event.target.title.value,
        description: event.target.description.value,
        quiz_id:quizCopy.quiz_id,
        _id:quizCopy._id,
        content_type:'quiz',
        questions: quizCopy.questions.map((question, qindex) => {
          const newQuestion = {
            question: event.target[`questions[${qindex}].question`].value,
            options: question.options.map((option, oindex) => ({
              answer: event.target[`questions[${qindex}].options[${oindex}].answer`].value,
              isCorrect: option.isCorrect,
            })),
          };
          return newQuestion;
        }),
      };
        console.log(formValues)
      dispatch(updateQuizData({index,cindex,data:formValues}))
      setEditToggle({ ...editToggle, lecture_edit: false })
    };
  
    return (
        <div className={`w-full h-full absolute top-0 bottom-0 flex flex-col place-items-center place-content-center  bg-black bg-opacity-20 z-50 left-0`}>
            <div className={`bg-white shadow-xl p-5 w-3/6 rounded-lg flex flex-col gap-6 font-poppins`}>
            <div className="w-full flex place-content-end place-items-center cursor-pointer" onClick={() => { setEditToggle({ ...editToggle, lecture_edit: false }) }}>
                <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
            </div>
            <h2 className="text-center text-primaryBlue font-semibold text-xl">Edit Quiz</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
                <div>
                <Input label="Title" variant="static" name="title" color="gray" defaultValue={lecture_content?.title} />
                {/* Add any necessary validation or error handling */}
                </div>
                <div>
                <Textarea label="Description" variant="static" color="gray" name="description" defaultValue={lecture_content?.description} className="scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100" />
                {/* Add any necessary validation or error handling */}
                </div>
                <div className="flex flex-col gap-6 h-60 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100">
                {quizCopy?.questions?.map((item, index) => (
                    <div className="w-full flex flex-col place-items-center bg-gray-50 p-5" key={index}>
                    <div className="w-full flex flex-col gap-6">
                        <div className="flex gap-3 place-content-between place-items-end">
                            <Input
                            variant="static"
                            label={`Question ${index + 1}`}
                            name={`questions[${index}].question`}
                            defaultValue={item?.question}
                            />
                            <MdDelete size={20} className=" cursor-pointer" onClick={()=>{handleDeleteQuestion(index)}}></MdDelete>
                        </div>
                        
                        {/* Add any necessary validation or error handling */}
                        <div className="flex flex-col gap-5">
                        {item?.options?.map((option, oindex) => (
                            <div className="w-full flex place-items-end place-content-between gap-2">
                                    <Input
                                    variant="static"
                                    label={`Option ${oindex + 1}`}
                                    name={`questions[${index}].options[${oindex}].answer`}
                                    defaultValue={option?.answer}
                                    />
                                    <MdDelete size={20} className=" cursor-pointer" onClick={()=>{handleDeleteOption(index,oindex)}}></MdDelete>
                            </div>
                            /* Add any necessary validation or error handling */
                            
                        ))}
                        </div>
                        <div className="w-full flex place-content-start">
                            <button className="bg-white border-2 border-gray-600 text-gray-800 px-3 py-2" onClick={()=>{handleNewOption(index)}}>Add Option</button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <div className="w-full flex place-content-center">
                    <button type="submit" className="bg-primaryBlue px-5 w-2/5 py-3 text-white font-semibold rounded-3xl">update</button>
                </div>
            </form>
            </div>
        </div>
      
    )
}
                   
  

const EditLecture=({editToggle,setEditToggle})=>{
    const dispatch = useDispatch()
    const {formData} = useSelector((state)=>state.createCourse);
    const [video,setVideo] = useState({toggle:false,video_name:editToggle?.lecture_content?.video_name,video_path:editToggle?.lecture_content?.video_path,upload:null});
    const [error,setError] = useState('');
    const [msg,setMsg] = useState('')
    const videoRef = useRef()
    console.log(video)
    const handleUploadVideo=()=>{
        setError(null)
        const {valid,reason} = videoValidation(video?.upload);
       
        if(!valid){
            setError({upload:reason});
        }else{
            const form = new FormData();
            form.append('section_video',video?.upload);
            form.append('exist_path',editToggle?.lecture_content?.video_path);
            axios.post('/instructor/course/upload-video',form)
            .then((res)=>{
                console.log(res)
                videoRef.current.textContent = "Uploaded"
                setVideo({...video,video_name:video.upload?.name,video_id:res.data.results.videoId,video_path:res.data.results.path,toggle:false})
                setMsg({upload:'Video Uploaded successfully'})
            })
            .catch((err)=>{
                setError({upload:"Unable to upload video, Try again after sometimes"})
            })
        }
    }

    const {handleSubmit,handleChange,handleBlur,values,errors,touched} = useFormik({
        initialValues:{
            title:editToggle?.lecture_content?.title,
            description:editToggle?.lecture_content?.description,
        },
        validationSchema:lectureSchema,
        onSubmit:(values)=>{
            const lecture = {title:values.title,description:values.description,video_name:video.video_name,video_path:video.video_path,content_type:"lecture"}
            dispatch(editLecture({sec_index:editToggle.index,con_index:editToggle.cindex,content:lecture}))
            setEditToggle({...editToggle,lecture_edit:false})
        }
    })
    
    return(
    <div className={`w-full h-full absolute top-0 bottom-0 flex flex-col place-items-center place-content-center  bg-black bg-opacity-20 z-50 left-0`}>
        <div className={`bg-white shadow-xl p-5 w-3/6 rounded-lg flex flex-col gap-6 font-poppins`}>
            <div className="w-full flex place-content-end place-items-center cursor-pointer" onClick={()=>{setEditToggle({...editToggle,lecture_edit:false})}}>
                <AiOutlineCloseCircle size={20}></AiOutlineCloseCircle>
            </div>
            <h2 className="text-center text-primaryBlue font-semibold text-xl">Edit Lecture</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                    <Input label="Title" variant="static" name="title" color="gray" defaultValue={editToggle?.lecture_content?.title} value={values.title} onChange={handleChange} onBlur={handleBlur}/>
                    {
                        errors?.title && touched?.title &&
                        <p className='text-red-500 font-normal text-sm font-poppins'>{errors?.title}</p>
                    }
                </div>
                <div>
                    <Textarea label="Description" variant="static" color="gray" name="description"  defaultValue={editToggle?.lecture_content?.description} onChange={handleChange} value={values.description} onBlur={handleBlur} className="scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-100" />
                    {
                        errors?.description && touched?.description &&
                        <p className='text-red-500 font-normal text-sm font-poppins'>{errors?.description}</p>
                    }
                </div>
                
                <div className="w-full">
                    <div className="flex flex-col  place-content-center gap-2">
                        <div className="flex gap-2 place-items-center">
                        {
                                    !video.toggle ?
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <h3 className="font-normal text-gray-600 text-md">Video : </h3>
                                            <p className="text-sm text-gray-600">{editToggle?.lecture_content?.video_name}</p>
                                            <BsFillPlayCircleFill size={20}></BsFillPlayCircleFill>
                                            <Link to={details.base_url+editToggle?.lecture_content?.video_path} target="_blank" className=" cursor-pointer text-black text-sm">Preview</Link>
                                        </div>
                                            {
                                                msg?.upload &&
                                                <p className='text-green-500 font-normal text-sm font-poppins'>{msg.upload}</p>
                                            }
                                    </div>
                                    :
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="video" className='text-sm text-gray-700'>Lecture Video</label>
                                        <input type="file"  accept='video/*'  onChange={(e)=>{setVideo({...video,upload:e.target.files[0]})}}/>
                                        {
                                        video.upload &&
                                        <div className='w-full'>
                                            {
                                                video.upload &&
                                                <button className={`border-2 border-gray-200 px-2 py-1`} type="button" onClick={()=>{handleUploadVideo()}} ref={videoRef}>Upload Video</button>
                                            }
                                            {
                                                error?.upload &&
                                                <p className='text-red-500 font-normal text-sm font-poppins'>{error?.upload}</p>
                                            }
                                            
                                        </div>
                                        
                                        }
                                        
                                    </div>
                                }
                            
                            
                            
                        </div>
                        
                        <div className="w-full">
                            <button className="text-sm text-gray-600 flex gap-3 place-items-center" type="button" onClick={()=>setVideo({...video,toggle:!video.toggle,upload:null})}>{video.toggle  ?  <><AiOutlineClose size={20}></AiOutlineClose> Cancel</>: <><CiEdit size={20}></CiEdit> Change Video</>}</button>
                        </div>
                    </div>
                    
                </div>
                <div className="w-full text-center">
                    <button className="text-white bg-primaryBlue rounded-3xl px-8 py-3 w-2/5" type="submit">Update</button>
                </div>
             </form>
        </div>
    </div>
    )
}

const courseModalse = {
    EditSection,
    EditQuiz,
    EditLecture,
    EditAssignment
}

export default courseModalse;