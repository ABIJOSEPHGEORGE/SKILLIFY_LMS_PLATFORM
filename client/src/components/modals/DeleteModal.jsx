import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'

function DeleteModal({  setPopup,popup }) {
  const handleAction = ()=>{
    popup.action()
    setPopup(false)
  }
  
  return (
    <div className='absolute top-0 flex place-content-center place-items-center bg-black bg-opacity-5 w-full h-screen left-0'>
      <motion.div
        initial={{ opacity: 0, 
          y: 60, scale: 0.5 }}
        animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        // making use of framer-motion spring animation
        // with stiffness = 300
        transition: { type: "spring", 
                  stiffness: 300 }
        }}
        exit={{ opacity: 0, scale: 0.5, 
       transition: { duration: 0.6 } }} className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex place-content-end w-full">
            <AiOutlineCloseCircle size={20} onClick={()=>{setPopup(false)}} className=' cursor-pointer'></AiOutlineCloseCircle>
          </div>
        <div className="mt-3 sm:flex place-content-center">
          
          <div className="w-full flex place-items-center flex-col mt-2 text-center sm:ml-4 sm:text-left">
            <div className="w-3/5 flex place-content-center">
               <img src="/confirm-question.gif" alt="confirm" />
            </div>
           
            <h4 className="text-lg font-medium text-gray-800">
              Are you sure you want to Delete ?
            </h4>
            <div className="items-center flex flex-col gap-2 mt-3 sm:flex">
              <button
                className="w-full mt-2 px-10  py-3 flex-1 text-white bg-red-600 rounded-3xl outline-none ring-offset-2 ring-red-600 focus:ring-2"
                onClick={()=>{handleAction()}}>
                Delete
              </button>


              <button
                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border-none ring-offset-2 ring-indigo-600 focus:outline-none"
                onClick={()=>{setPopup(false)}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteModal