import React, { useEffect,useState } from 'react'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
import { adminForcedLogout } from '../../helpers/user/AuthHelpers'
import { useNavigate } from 'react-router-dom'



function AllInstructors() {
    const navigate = useNavigate()
    const [instructors,setInstructors] = useState([])
    const [status,setStatus]= useState({})
    const [toggle,setToggle] = useState(false);
    const [key,setKey] = useState('')

    useEffect(()=>{
        fetchInstructors()
    },[])
    function fetchInstructors(){
        axios.get('/admin/instructors')
        .then((res)=>{
            console.log(res)
            setInstructors(res.data.results.instructors)
        })
        .catch((err)=>{
            if(err.response.status===403){
                localStorage.removeItem('authKey')
                navigate('/admin',{replace:true})
            }else{
                toast.error(err.response.data.message)
            }
        })
    }
    const updateInstructor=async({_id,status})=>{
        setToggle(false)
        await axios.put(`/admin/users/status/${_id}?status=${status}`)
        .then((res)=>{
            toast.success('Instructor Updated Successfully');
            fetchInstructors()
        })
        .catch((err)=>{
            if(err.response.status===403){
                localStorage.removeItem('authKey')
                navigate('/admin',{replace:true})
            }else{
                toast.error(err.response.data.message)
            }
        })
    }
    const handleSearch=(e)=>{
        setKey(e.target.value)
    }
  return (
    <div className='w-full h-screen p-5 font-poppins'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
        <div className="w-full p-5">
            <input type="text" onChange={(e)=>{handleSearch(e)}} value={key} placeholder='Search by name or email' className="border-b-2 border-primaryBlue focus:outline-none px-2 w-full"/>
        </div>
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
       
    <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
        <tr>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Instructor Name</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Email</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
            <th scope="col" class="px-6 py-4 font-medium text-gray-900">Action</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 border-t border-gray-100">
            {
                instructors.filter((item)=>(
                    key!=="" ? item.first_name.includes(key) || item.email.includes(key) : item
                ))
                .map((user,index)=>(
                    <tr class="hover:bg-gray-50" key={index}>
                        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div class="relative h-10 w-10">
                            <img
                            class="h-full w-full rounded-full object-cover object-center"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            />
                            <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                        </div>
                        <div class="text-sm">
                            <div class="font-medium text-gray-700">{`${user.first_name} ${user.last_name}`}</div>
                            <div class="text-gray-400">{user.email}</div>
                        </div>
                        </th>
                        <td class="px-6 py-4">
                            <p>{user.email}</p>
                        </td>
                        <td class="px-6 py-4">
                            {!user.status ?
                            <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                    Active
                            </span>
                            :
                            <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                                    Blocked
                            </span>
                            }
                        </td>
                        <td class="px-6 py-4">
                            <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={user.status}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setStatus({_id:user._id,status:!user.status})
                                            setToggle(true)
                                        }}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                    {user.status ? 
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            Unblock
                                        </span>
                                        :
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            Block
                                        </span>
                                    }
                                    
                                </label>
                            </div>
                        </td>
                    </tr>
                ))
            }
        
       
        </tbody>
        </table>
        
        </div>
        {toggle ? (
                
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div
                            className="fixed inset-0 w-full h-full bg-black opacity-40"
                            onClick={() => setToggle(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                                <div className="mt-3 sm:flex place-content-center">
                                    
                                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                    {
                                        status.status ? 
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Are you sure you want to block ?
                                        </h4>
                                        :
                                        <h4 className="text-lg font-medium text-gray-800">
                                            Are you sure you want to Unblock ?
                                        </h4>
                                    }
                                        
                                        <div className="items-center gap-2 mt-3 sm:flex">
                                            {
                                                status.status?
                                                <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                                onClick={() =>
                                                    updateInstructor(status)
                                                }
                                            >
                                                Block
                                            </button>
                                            :
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-white bg-green-600 rounded-md outline-none ring-offset-2 ring-green-600 focus:ring-2"
                                                onClick={() =>
                                                    updateInstructor(status)
                                                }
                                            >
                                                unblock
                                            </button>
                                                }
                                            <button
                                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                                onClick={() =>
                                                    setToggle(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            ) : null}
    </div>
  )
}

export default AllInstructors