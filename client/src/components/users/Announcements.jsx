import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TimeAgo from 'react-timeago'

function Announcements() {
    const { id } = useParams()
    const [announcements,setAnnouncements] = useState([])

    async function fetchAnnouncements(){
        try{
            const res = await axios.get(`/user/course/announcements/${id}`)
            setAnnouncements(res.data.results)
        }catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        fetchAnnouncements()
    },[])

  return (
    <div className="w-full h-80 max-h-80 flex flex-col place-items-start p-5">
        {
            announcements?.map((ele)=>(
                <div className="bg-secondary w-3/5 gap-3 h-auto p-3 flex flex-col place-items-start place-content-center">
                    <h2 className='font-semibold '>{ele?.title}</h2>
                    <p className='text-sm'>{ele?.message}</p>
                    <div className="w-full flex place-content-end ">
                        <TimeAgo className=' text-sm text-gray-600 ' date={ele?.createdAt} />
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Announcements