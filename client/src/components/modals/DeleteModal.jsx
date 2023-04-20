import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

function DeleteModal({  setPopup,popup }) {
  const handleAction = ()=>{
    popup.action()
    setPopup(false)
  }
  return (
    <div className='absolute top-0 flex place-content-center place-items-center bg-black bg-opacity-5 w-full h-screen left-0'>
      <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex place-content-end w-full">
            <AiOutlineCloseCircle size={20} onClick={()=>{setPopup(false)}} className=' cursor-pointer'></AiOutlineCloseCircle>
          </div>
        <div className="mt-3 sm:flex place-content-center">
          
          <div className="mt-2 text-center sm:ml-4 sm:text-left">

            <h4 className="text-lg font-medium text-gray-800">
              Are you sure you want to Delete ?
            </h4>
            <div className="items-center gap-2 mt-3 sm:flex">
              <button
                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                onClick={()=>{handleAction()}}>
                Delete
              </button>


              <button
                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                onClick={()=>{setPopup(false)}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal