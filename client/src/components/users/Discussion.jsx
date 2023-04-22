import { Input } from '@material-tailwind/react'
import React, { useEffect,useState } from 'react'
import { AiOutlineSend } from 'react-icons/ai'
import {io} from 'socket.io-client'

function Discussion({courseId}) {
    const socket = io("http://localhost:3001");
    const [message,setMessage] = useState('')
     //decode the user and send to socket io
     
    const newDiscussion=()=>{
        socket.emit("discussion",{message:message,courseId:courseId})
    }
    
  return (
    <div className='w-full font-poppins'>
        <div className="p-5 w-full h-full flex flex-col place-content-between">
            <div className="overflow-y-scroll h-80 scrollbar-hide">
                <div className="w-2/5 h-32">
                    <div className="w-full bg-secondary rounded-2xl rounded-tl-none p-3">
                        <h3 className='text-md font-normal'>Some messages</h3>
                    </div>
                    <div className="flex place-content-between p-1">
                        <p className='text-sm text=gray-600'>Abin</p>
                        <p className='text-sm text-gray-600 '>~53 minutes ago</p>

                    </div>
                </div>
            </div>
            <div className="w-full flex gap-2 place-items-center">
                <Input type='text' variant='static' value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder='Discuss something...'/>
                <AiOutlineSend size={20} className=' cursor-pointer' onClick={()=>{newDiscussion()}}></AiOutlineSend>
            </div>
        </div>
    </div>
  )
}

export default Discussion