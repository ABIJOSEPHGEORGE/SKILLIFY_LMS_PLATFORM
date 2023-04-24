import { motion } from "framer-motion"
import { Input,Textarea } from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import { editSectionDetails, updateSection } from "../../redux/createCourse"
import { AiOutlineCloseCircle,AiOutlinePlus } from "react-icons/ai"
import { useState } from "react"
import { MdDelete } from "react-icons/md"

const EditSection=({setToggle,toggle})=>{
    const dispatch = useDispatch()
    const {formData} = useSelector((state)=>state.createCourse)
    const [details,setDetails] = useState({title:formData.curriculum[toggle.index].title,description:formData.curriculum[toggle.index].description});
    function updateSectionDetails(){
        dispatch(editSectionDetails({sec_index:toggle.index,title:details.title,description:details.description}));
        setToggle({...toggle,toggleEdit:false})
    }


    //const section = formData.curriculum[index];
    return(
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
                <div className="w-full flex place-content-between place-items-center">
                    <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white border-gray-600 border-2' type="button" onClick={(e)=>{setToggle({...toggle,toggleEdit:false})}}>Cancel</button>
                    <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white border-gray-600 border-2' type="button" onClick={(e)=>{updateSectionDetails()}}>Update Section</button>
                </div>
            </motion.div>
        </div>
        
    )
    
}

const EditQuestion=({setToggle,toggle,updateQuestion,updateCorrectAnswer,updateOption,addOption,addQuestion})=>{

return(
    <div className="w-3/5  flex place-items-center place-content-center">
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ ease: "easeOut", duration: 0.5 }} className="bg-white w-full p-5 gap-6 flex flex-col place-content-around shadow-xl rounded-xl my-3" >
    <div className="w-full flex place-content-end">
        <AiOutlineCloseCircle size={20} className=" cursor-pointer" onClick={()=>{setToggle({...toggle,toggleEdit:false})}}></AiOutlineCloseCircle>
    </div>
    <div className="w-full h-auto flex flex-col gap-6 p-3">
        {
        toggle?.map((ele, qindex) => (
            <div className='flex flex-col gap-4'>
            <div className="flex place-items-center">
                <Input variant='static' label={`Question ${qindex + 1}`} placeholder='Enter the question' type='text' value={ele.question} onChange={(e) => { updateQuestion(e, qindex) }} />
                <MdDelete size={20} className=' cursor-pointer' onClick={() => {}}></MdDelete>
            </div>



            {
                ele?.options.map((option, oindex) => (
                <div className="w-full flex place-items-center gap-4">

                    <Input variant='static' label={`Option ${oindex + 1}`} value={option.answer} placeholder='Enter the Option' type='text' onChange={(e) => { updateOption(e, qindex, oindex) }} />



                    <MdDelete size={20} className=' cursor-pointer' onClick={() => {}}></MdDelete>
                </div>

                ))
            }
            {
                ele.options.length > 0 &&
                <div className='w-full'>
                <label className='text-md text-gray-600 focus:text-blue-500'>Select the correct answer</label>
                <select name="correct_answer" className='w-full focus:outline-none cursor-pointer' onChange={(e) => { updateCorrectAnswer(e, qindex) }} id="correct_answer">
                    <option>select</option>
                    {

                    ele.options.map((option, index) => (
                        <option value={index}>{option.answer}</option>
                    ))
                    }
                </select>
                </div>
            }
            <div className="w-full flex place-content-between place-items-center gap-3">
                <button className='flex gap-2 border-2 border-gray-500 py-1 px-2 text-sm' type="button" onClick={() => { addOption(qindex) }}>Option <AiOutlinePlus size={20}></AiOutlinePlus></button>


                <button className='flex gap-2 border-2 border-gray-500 py-1 px-2 text-sm bg-black text-white' type='button' onClick={() => { addQuestion(qindex) }}>Add</button>


            </div>
            </div>
        ))

        }



            </div>
        </motion.div>
    </div>
    )
}

const EditLecture=({editToggle,setEditToggle})=>{
    console.log(editToggle)
    return(
        <div>
            <Input label="Title" variant="static"/>
        </div>
    )
}

const courseModalse = {
    EditSection,
    EditQuestion,
    EditLecture,
}

export default courseModalse;