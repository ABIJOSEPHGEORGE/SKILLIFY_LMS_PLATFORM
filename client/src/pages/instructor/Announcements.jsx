import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import SideMenu from '../../components/instructors/SideMenu'
import { Link } from 'react-router-dom'
import CreateAnnouncement from '../../components/modals/CreateAnnouncement'
import axios from 'axios'
import TimeAgo from 'react-timeago'
import DeleteModal from '../../components/modals/DeleteModal'
import EditAnnouncement from '../../components/modals/EditAnnouncement'

function Announcements() {
  const [toggle,setToggle] = useState({toggle:false,payload:null})
  const [announcements,setAnnouncements] = useState([]);
  const [popup,setPopup] = useState({toggle:false,action:null,edit:false})

  async function fetchAnnouncements(){
    try{
      const res = await axios.get('/instructor/announcements')
      setAnnouncements(res.data.results)
      console.log(res)
    }catch(err){
      toast.error("Something went wrong...")
    }
  }

  async function deleteAnnouncement(id){
    try{
        const res = await axios.delete(`/instructor/announcements/${id}`)
        fetchAnnouncements()
    }catch(err){
      toast.error("Something wen't wrong...")
    }
  }

  useEffect(()=>{
    fetchAnnouncements()
  },[])
  return (
    <div className='flex'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
        <SideMenu/>
        <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className=" h-20 w-full flex place-content-between place-items-center px-5 gap-24">
                <h3 className='font-semibold text-primaryViolet text-2xl '>Announcements</h3>
                <button className='bg-primaryBlue px-3 py-3 text-white font-semibold text-center rounded-sm' onClick={()=>setToggle({toggle:true})}>Make Announcement</button>
            </div>
            <div className="w-full">
                              
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Announcement Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Announcement 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Course
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Time
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {
                              announcements?.map((ele,index)=>(
                                <tr key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ele?.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {ele?.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ele?.courseId?.course_title}
                                    </td>
                                    <td className="px-6 py-4">
                                      <TimeAgo className='mb-8 text-sm text-gray-600 ' date={ele?.createdAt} />
                                    </td>
                                    
                                    <td className="px-6 py-4 flex gap-3">
                                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={()=>setToggle({edit:true,payload:ele})}>Edit</button>
                                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={()=>setPopup({toggle:true,action:()=>deleteAnnouncement(ele?._id)})}>Delete</button>
                                    </td>
                                </tr>
                              ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>

        {
          toggle.toggle &&
          <CreateAnnouncement toggle={toggle} setToggle={setToggle} fetchAnnouncements={fetchAnnouncements}/>
        }
        {
          popup.toggle &&
          <DeleteModal setPopup={setPopup} popup={popup} />
        }
        {
          toggle.edit &&
          <EditAnnouncement toggle={toggle} setToggle={setToggle} fetchAnnouncements={fetchAnnouncements}/>
        }
    </div>
  )
}

export default Announcements