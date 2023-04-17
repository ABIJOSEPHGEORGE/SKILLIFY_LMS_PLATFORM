import React, {  useRef, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { updateSection,deleteSection, updateLecture, createSection, createContent, updateAssignment,createQuestion,createQuiz, createNewQuestion, deleteContent } from '../../../redux/createCourse';
import { Input,Textarea, button } from '@material-tailwind/react';
import {AiFillPlayCircle, AiFillQuestionCircle, AiOutlineClose, AiOutlinePlus} from 'react-icons/ai'
import { MdDelete, MdModeEdit} from 'react-icons/md';
import {HiDocument} from 'react-icons/hi'
import axios from 'axios';
import { GrClose, GrSave } from 'react-icons/gr';
import {motion} from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify';
import courseModals from './courseModals';
import { Link } from 'react-router-dom';
import { details } from '../../../config';


function CourseFormThree({formik}) {
  const {section,formData,lecture,assignment,quiz} = useSelector(state=>state.createCourse);
  const dispatch = useDispatch( )
  const [toggle,setToggle] = useState({section:false,curriculum:{status:false,index:''},lecture:{status:false,index:''},quiz:false,assignment:false,question:false,toggleEdit:false,index:null});
  const [options,setOptions] = useState([]);
  const [questions,setQuestions] = useState([]);
  const [video,setVideo] = useState(null);
  const [path,setPath] = useState(null)
  const videoRef = useRef()

  function newSection(e){
    e.preventDefault()
    
    dispatch(createSection(section));
    setToggle({...toggle,section:!toggle.section});
    dispatch(updateSection({title:'',description:'',content:[]}))
  }

  const saveContent =(index,content_type)=>{
    if(content_type==="lecture"){
        dispatch(createContent({index:index,
        content:{title:lecture.title,description:lecture.description,video_name:lecture.video_name,video_path:lecture.video_path,content_type:content_type}}));
        dispatch(updateLecture({title:'',description:'',video:''}));
        setToggle({...toggle,lecture:!toggle.lecture})
        setVideo(null)
    }else if(content_type==="assignment"){
      dispatch(createContent({index:index,
        content:{title:assignment.title,description:assignment.description,content_type:content_type}}));
        dispatch(updateAssignment({title:'',description:'',file_name:''}));
        setToggle({...toggle,assignment:!toggle.assignment})
    }else if(content_type==="quiz"){
      dispatch(createContent({index:index,
        content:{title:quiz.title,description:quiz.description,content_type:content_type,questions:[]}}));
        setToggle({...toggle,quiz:!toggle.quiz})
    }

  }

  const addOption=(index)=>{
    const newQuestions = [...questions];
    const updatedOptions = newQuestions[index].options
    const option = {answer:'',isCorrect:false}
    updatedOptions.push(option);
    newQuestions[index].options =updatedOptions;
    setQuestions(newQuestions);
  }

  const deleteOption=(qindex,opIndex)=>{
      const newQuestion = [...questions]
      const newOptions = questions[qindex].options;
      newQuestion[qindex].options = newOptions.filter((item,index)=>(
          opIndex!==index
      ))
      setQuestions(newQuestion)
  }

  function handleDelete(index){
    dispatch(deleteSection(index));
  }

  const newQuestion=()=>{
    const singleQuestion = {question:'',options:[]}
    setQuestions([...questions,singleQuestion])
  }

  const updateQuestion=(e,index)=>{
      const newQuestion = [...questions];
     newQuestion[index].question = e.target.value;
     setQuestions(newQuestion);
  }

  const updateOption=(e,qindex,oindex)=>{
      const newQuestion = [...questions];
      newQuestion[qindex].options[oindex].answer = e.target.value;
      setQuestions(newQuestion)
  }

  const updateCorrectAnswer=(e,index)=>{
      const newQuestion = [...questions];
      newQuestion[index].options.map((ele)=>(
        ele.isCorrect = false
      ))
      newQuestion[index].options[e.target.value].isCorrect = true;
      setQuestions(newQuestion)
  }

  const addQuestion =(qindex,con_index,sec_index)=>{
      const newQuestion = [...questions];
      dispatch(createNewQuestion({sec_index,con_index,question:newQuestion[qindex]}));
      newQuestion.splice(qindex,1);
      setQuestions(newQuestion);
      console.log(formData)
  }



  async function uploadVideo(){
    const form = new FormData()
    form.append('section_video',video);
    
    axios.post('/instructor/course/upload-video',form)
    .then((res)=>{
        dispatch(updateLecture({...lecture,video_name:video.name,video_path:res.data.results.path}))
        videoRef.current.textContent = "Uploaded"
        setVideo(null)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  console.log(formData)
 
  return (
    <div className="font-poppins w-full h-auto flex flex-col place-content-evenly py-4">
      <ToastContainer position='top-center' limit={3}></ToastContainer>
        <h2 className='text-start text-2xl text-black font-semibold py-5'>Curriculum</h2>
        
        {
          formData.curriculum.length>0 &&
        <div className=' flex flex-col gap-6 overflow-y-scroll h-auto'>
            {
              formData.curriculum.map((item,index)=>(
                <div className="bg-gray-300 border-2 border-gray-600 bg-opacity-10 w-full h-auto p-5 gap-6 flex flex-col place-content-around">
                  <div className="w-full flex place-items-center gap-2">
                    <div className="w-full flex gap-3 place-items-center">
                      <h1 className='text-black font-semibold text-xl'>Section {index+1} :</h1>
                      <h2 className='text-black font-semibold text-md' > {item.title}</h2>
                    </div>
                    <div className="flex gap-3 place-items-center">
                      <MdDelete size={20} className="cursor-pointer" onClick={()=>{handleDelete(index)}}></MdDelete>
                      <MdModeEdit size={20} className='cursor-pointer' onClick={()=>{setToggle({...toggle,toggleEdit:true,index:index})}}></MdModeEdit>
                    </div>
                    
                  </div>
                    <p className='text-black font-light text-sm' ><span className='text-black font-semibold text-md'>Description :</span> {item.description}</p>
                    <div className="w-full flex flex-col gap-2">
                      {
                        item.content.map((item,cindex)=>(
                          <div className='w-full m-2 p-2 bg-white border-gray-500 border-2 gap-6'>
                           
                              <div className="flex gap-3 place-items-center place-content-between">
                                <div className='flex gap-3'>
                                    <h1 className='font-semibold text-sm first-letter:capitalize'>{item.content_type} : </h1>
                                    <h2 className='font-semibold text-sm first-letter:capitalize'>{item.title}</h2>
                                </div>
                                <div className="flex gap-3 place-items-center">
                                  <MdDelete size={20} className="cursor-pointer" onClick={()=>{dispatch(deleteContent({sec_index:index,cindex:cindex}))}}></MdDelete>
                                  <MdModeEdit size={20} className='cursor-pointer' onClick={()=>{setToggle({...toggle,toggleEdit:true,index:index})}}></MdModeEdit>
                                </div>
                              </div>
                              <div className='flex gap-3 place-items-center'>
                                  <h1 className='font-semibold text-sm first-letter:capitalize'>description : </h1>
                                  <p className='font-light text-sm'>{item.description}</p>
                              </div>
                              {
                                item.content_type==="lecture" ?
                                <div className="flex gap-3 place-items-center">
                                    <h1 className='font-semibold text-sm first-letter:capitalize'>video : </h1>'
                                    <p className='font-light text-sm'>{item.video_name}</p>
                                    <Link to={details.base_url+item.video_path} target="_blank" rel="noopener noreferrer" className='text-md font-normal flex gap-2 place-items-center'><AiFillPlayCircle size={20}></AiFillPlayCircle>Preview</Link>
                                </div>
                               : item.content_type==="quiz" ?
                                <div className="w-full place-content-center flex flex-col gap-3 place-items-start">
                                  <div className="w-full flex gap-3 place-items-center">
                                    <h3 className='text-md font-semibold'>Questions</h3>
                                    <button className="text-sm  font-normal flex gap-2 place-items-center border-2 border-gray-600 py-1 px-2  my-2" onClick={()=>{newQuestion()}}>New Question</button>
                                  </div>
                                   <div className="w-full">
                                      {
                                        item?.questions.map((ele,index)=>(
                                          <div className='w-full'>
                                              <ul>
                                                <li className='list-none'>{index+1}. {ele.question}</li>
                                              </ul>
                                          </div>
                                        ))
                                      }
                                    </div> 
                                    
                                    
                                      <div className="w-full h-auto flex flex-col gap-6 p-3">
                                        {
                                          questions.map((ele,qindex)=>(
                                            <div className='flex flex-col gap-4'>
                                                <Input variant='static' label={`Question ${qindex+1}`} placeholder='Enter the question' type='text' value={ele.question} onChange={(e)=>{updateQuestion(e,qindex)}}/> 
                                                {
                                                  ele?.options.map((option,oindex)=>(
                                                    <div className="w-full flex place-items-center gap-4">
                                                         <Input variant='static' label={`Option ${oindex+1}`} value={option.answer} placeholder='Enter the Option' type='text' onChange={(e)=>{updateOption(e,qindex,oindex)}} /> 
                                                         <MdDelete size={20} className=' cursor-pointer' onClick={()=>deleteOption(qindex,oindex)}></MdDelete>
                                                    </div>
                                                   
                                                  ))
                                                }
                                                {
                                                  ele.options.length > 0 &&
                                                  <div className='w-full'>
                                                        <label className='text-md text-gray-600 focus:text-blue-500'>Select the correct answer</label>
                                                       <select name="correct_answer" className='w-full focus:outline-none cursor-pointer' onChange={(e)=>{updateCorrectAnswer(e,qindex)}} id="correct_answer">
                                                          <option>select</option>
                                                          {
                                                    
                                                            ele.options.map((option,index)=>(
                                                                <option value={index}>{option.answer}</option>
                                                            ))
                                                          }
                                                      </select> 
                                                  </div>
                                                }
                                                <div className="w-full flex place-content-between gap-3">
                                                  <button className='flex gap-2 border-2 border-gray-500 py-1 px-2 text-sm' type="button" onClick={()=>{addOption(qindex)}}>Option <AiOutlinePlus size={20}></AiOutlinePlus></button>
                                                  <button className='flex gap-2 border-2 border-gray-500 py-1 px-2 text-sm bg-black text-white' type='button' onClick={()=>{addQuestion(qindex,cindex,index)}}>Add</button>
                                                </div>
                                            </div>
                                          ))
                                          
                                        }
                                         
                                         
                                          
                                      </div>
                                    
                                </div>
                                : null
                              }
                              
                          </div>
                        ))
                      }
                    </div>
                    <div className="w-full flex place-content-start">
                        <button className='flex gap-3 place-items-center border-gray-600 border-2 p-2' type="button" onClick={()=>{setToggle({...toggle,curriculum:{status:!toggle.curriculum.status,index:index}})}}>Curriculum Item {toggle.curriculum.status && toggle.curriculum.index===index ? <AiOutlineClose size={20}></AiOutlineClose> : <AiOutlinePlus size={20}></AiOutlinePlus> }</button>  
                    </div> 
                    {
                      toggle.curriculum.status && toggle.curriculum.index===index &&
                      <motion.div initial={{opacity:0}} animate={{opacity:1}}
                      transition={{ ease: "easeOut", duration: 1 }}  className="w-full flex flex-col gap-14">
                        <div className='flex gap-3'>
                          <button type='button' className='text-primaryBlue flex gap-2 font-semibold' onClick={()=>{setToggle({...toggle,lecture:{status:!toggle.lecture.status,index:index}})}}>Lecture {!toggle.lecture.status ? <AiOutlinePlus size={20}></AiOutlinePlus> : <AiOutlineClose size={20}></AiOutlineClose>}</button>
                          <button type='button' className='text-primaryBlue flex gap-2 font-semibold' onClick={()=>{setToggle({...toggle,quiz:!toggle.quiz})}}>Quiz {!toggle.quiz ? <AiOutlinePlus size={20}></AiOutlinePlus> : <AiOutlineClose size={20}></AiOutlineClose>}</button>
                          <button type='button' className='text-primaryBlue flex gap-2 font-semibold' onClick={()=>{setToggle({...toggle,assignment:!toggle.assignment})}}>Assignment {!toggle.assignment ? <AiOutlinePlus size={20}></AiOutlinePlus> : <AiOutlineClose size={20}></AiOutlineClose>}</button>
                        </div>
                          {
                            toggle.lecture.status && toggle.lecture.index===index &&
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeOut", duration: 1 }}  className='w-full flex flex-col gap-6'>
                              <Input variant='static' label='Lecture Title' placeholder='Enter the title for the lecture' type='text' value={lecture.title} onChange={(e)=>{dispatch(updateLecture({...lecture,title:e.target.value}))}}/>
                              <Textarea variant='static' label='Lecture Description' placeholder='Enter the description for the lecture' type="text" value={lecture.description} onChange={(e)=>{dispatch(updateLecture({...lecture,description:e.target.value}))}}/>
                              <div className="w-full flex gap-3 flex-col">
                                <label htmlFor="video" className='text-sm text-gray-700'>Lecture Video</label>
                                <input type="file"  accept='video/*' onChange={(e)=>{setVideo(e.target.files[0])}}/>
                                {
                                  video &&
                                  <div className='w-full'>
                                      <button className='border-2 border-gray-200 px-2 py-1' onClick={uploadVideo} ref={videoRef}>Upload Video</button>
                                  </div>
                                  
                                }
                              </div>
                              <div className="w-full flex place-content-start">
                                <button className='text-md border-2 border-gray-600  p-2 flex gap-3' onClick={()=>{saveContent(index,'lecture')}}>Save Lecture <GrSave size={20}></GrSave></button>
                              </div>
                            </motion.div>
                          }   
                          {
                            toggle.assignment &&
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeOut", duration: 1 }}  className='w-full flex flex-col gap-6'>
                              <Input variant='static' label='Assignment Question' placeholder='Enter the question for assignment' type='text' value={assignment.title} onChange={(e)=>{dispatch(updateAssignment({...assignment,title:e.target.value}))}}/>
                              <Textarea variant='static' label='Assignment Description' placeholder='Enter the description for the assignment' type="text" value={assignment.description} onChange={(e)=>{dispatch(updateAssignment({...assignment,description:e.target.value}))}}/>
                              
                              <div className="w-full flex place-content-start">
                                <button className='text-md border-2 border-gray-600  p-2 flex gap-3' onClick={()=>{saveContent(index,'assignment')}}>Save Assignment <GrSave size={20}></GrSave></button>
                              </div>
                            </motion.div>
                          }
                          {
                            toggle.quiz &&
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}
                            transition={{ ease: "easeOut", duration: 1 }}  className='w-full flex flex-col gap-6'>
                              <Input variant='static' label='Quiz Title' placeholder='Enter the title for the Quiz' type='text' value={quiz.title} onChange={(e)=>{dispatch(createQuiz({...quiz,title:e.target.value}))}}/>
                              <Textarea variant='static' label='Quiz Description' placeholder='Enter the description for the assignment' type="text" value={quiz.description} onChange={(e)=>{dispatch(createQuiz({...quiz,description:e.target.value}))}}/>
                              <div className="w-full flex place-content-start">
                                <button className='text-md border-2 border-gray-600  p-2 flex gap-3' onClick={()=>{saveContent(index,'quiz')}}>Create Quiz <GrSave size={20}></GrSave></button>
                              </div>
                            </motion.div>
                          }
                      </motion.div>
                    }
                    
                </div>
              ))
            }
        </div>
          }
        
        <div className="w-full py-3">
          <button onClick={()=>{setToggle({...toggle,section:!toggle.section})}} type='button' className='text-md bg-white border-2 border-gray-600 px-5 py-3 font-normal flex place-content-between gap-2 place-items-center'>Section {!toggle.section ? <AiOutlinePlus size={20}></AiOutlinePlus> : <GrClose size={20}></GrClose>} </button>
        </div>

        {
          toggle.section &&
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ ease: "easeOut", duration: 1 }} className="bg-white w-full p-5 gap-6 flex flex-col place-content-around border-gray-600 border-2 my-3" >
              <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                <Input label='Enter Section Title' variant='static' type='text' name="section_title" value={section.title} onChange={(e)=>{dispatch(updateSection({...section,title:e.target.value}))}}  placeholder="Enter the section title"></Input>
              </div>
              <div className='w-full flex flex-col place-items-start place-content-center'>
                <Textarea label='Enter Section description' variant='static' type='text' name="section_description" value={section.description} onChange={(e)=>dispatch(updateSection({...section,description:e.target.value}))} placeholder="Enter the section description"/>
              </div>
              
              
              <div className="w-full flex place-content-end">
                <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white border-gray-600 border-2' type="button" onClick={(e)=>{newSection(e)}}>Add Section</button>
              </div>
             
          </motion.div>
        }
        {
           toggle.toggleEdit &&
          <div className="w-full absolute top-0 flex flex-col place-content-center place-items-center bg-black bg-opacity-5 z-50 left-0 h-full">
            <courseModals.EditSection setToggle={setToggle} toggle={toggle}/>
          </div>
          
        }
        
    </div>
  )
}

export default CourseFormThree