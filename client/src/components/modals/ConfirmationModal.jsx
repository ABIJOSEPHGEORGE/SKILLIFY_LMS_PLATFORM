import React from 'react'
import {motion} from 'framer-motion'

function ConfirmationModal({popup,setPopup}) {
    const {toggle,onConfirm,params} = popup;
  return (
    <div className='w-full h-full absolute top-0 z-50 bg-black bg-opacity-5 flex place-content-center place-items-center font-poppins'>
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
       transition: { duration: 0.6 } }}
        className='bg-white shadow-xl flex flex-col place-content-center place-items-center w-1/5 p-5 rounded-md gap-5'>
          <img src="/confirm-question.gif" alt="confirm" />
            <h1 className='text-md font-poppins font-semibold text-center'>Are you sure you want to {params ? 'list the course' : 'unlist the course'} ?</h1>
            <div className=" w-full place-content-center flex flex-col gap-8 place-items-center">
              <>
              {
                params ?
                <button className='bg-green-500 text-white text-center text-sm px-8 py-3 rounded-2xl' onClick={()=>onConfirm(params)}>Yes, List Course</button>
                :
                <button className='bg-red-500 text-white text-center text-sm px-8 py-3 rounded-2xl' onClick={()=>onConfirm(params)}>Yes, Unlist Course</button>
              }
              </>
              <button className=' text-gray-800 text-center text-sm' onClick={()=>setPopup({...popup,toggle:false})}>Cancel</button>
                
            </div>
        </motion.div>
    </div>
  )
}

export default ConfirmationModal