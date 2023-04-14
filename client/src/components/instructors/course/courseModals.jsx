import { motion } from "framer-motion"
import { Input,Textarea } from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import { updateSection } from "../../../redux/createCourse"
import { AiOutlineCloseCircle } from "react-icons/ai"
import { useState } from "react"

const EditSection=({index})=>{
    const dispatch = useDispatch()
    const [details,setDetails] = useState({title:'',description:''});
    const {formData} = useSelector((state)=>state.createCourse)

    //const section = formData.curriculum[index];
    return(
        <div className="w-3/5  flex place-items-center place-content-center">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ ease: "easeOut", duration: 1 }} className="bg-white w-full p-5 gap-6 flex flex-col place-content-around shadow-xl rounded-xl my-3" >
                <div className="w-full flex place-content-end">
                    <AiOutlineCloseCircle size={20} className=" cursor-pointer"></AiOutlineCloseCircle>
                </div>
                <h2 className="text-center font-semibold text-primaryBlue text-xl">Edit Section</h2>
                <div className='w-full flex flex-col place-items-start place-content-center py-2'>
                <Input label='Section Title' variant='static' type='text' name="section_title"  value={details.title} onChange={(e)=>setDetails({...details,title:e.target.value})}  placeholder="Enter the section title"></Input>
                </div>
                <div className='w-full flex flex-col place-items-start place-content-center'>
                <Textarea label='Section description' variant='static' type='text' name="section_description"  value={details.description} onChange={(e)=>setDetails({...details,description:e.target.value})} placeholder="Enter the section description"/>
                </div>
                <div className="w-full flex place-content-between place-items-center">
                    <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white border-gray-600 border-2' type="button" onClick={(e)=>{}}>Cancel</button>
                    <button className=' w-1/6 px-1 py-2 text-black font-normal bg-white border-gray-600 border-2' type="button" onClick={(e)=>{}}>Update Section</button>
                </div>
            </motion.div>
        </div>
        
    )
    
}

const courseModalse = {
    EditSection
}

export default courseModalse;