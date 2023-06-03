import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import axios from 'axios'
import AssignmentFeedback from '../../components/modals/AssignmentFeedback';
import { ToastContainer, toast } from 'react-toastify';


function Assignments() {
    const [assignments,setAssignments] = useState(null);
    const [toggle,setToggle] = useState({toggle:false,payload:null});

    useEffect(()=>{
        fetchAssignments()
    },[])

    async function fetchAssignments(){
        try{
            const res = await axios.get('/instructor/assignments/');
            setAssignments(res.data.results)
      
        }catch(err){
            toast.error("Something went wrong...")
        }
    }

    function toggleFeedback(assignment){
        setToggle({toggle:!toggle.toggle,payload:assignment})
    }


  return (
    <div className='flex'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
        <SideMenu/>
        <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className=" h-20 w-full flex place-content-start place-items-center px-5">
                <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Assignments</h3>
            </div>
            <div className='w-full h-auto'>
                
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Course
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Feedback</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assignments?.map((assignment,index)=>(
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {assignment.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {assignment.course}
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                !assignment.status ?
                                                <span class="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">
                                                <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                                    Pending
                                                 </span>
                                                 :
                                                 <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                                    Feeback Submitted
                                                </span>
                                            }
                                        </td>
                                    
                                        <td class="px-6 py-4 text-right">
                                            <button className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer" type='button' onClick={()=>{toggleFeedback(assignment)}}>Review</button>
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
            <AssignmentFeedback toggle={toggle} setToggle={setToggle} load={fetchAssignments}/>
        }
    </div>
  )
}

export default Assignments