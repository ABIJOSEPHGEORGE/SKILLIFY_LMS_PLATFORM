import React, { useEffect, useState } from 'react'
import SideBar from '../../components/admin/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import { updateCouponToggle, updateEditToggle } from '../../redux/couponSlice';
import AddCoupon from '../../components/admin/coupon/AddCoupon';
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import { AiOutlineEdit } from 'react-icons/ai';
import EditCoupon from '../../components/admin/coupon/EditCoupon';


function CouponManagement() {
    const dispatch = useDispatch()
    const {toggle,editToggle} = useSelector(state=>state.couponSlice);
    const [coupons,setCoupons] = useState();

    useEffect(()=>{
        fetchAcllCoupon()
    },[])

    function formatDate(dateString) {
        const date = new Date(dateString);
        return moment(date).format('MMMM Do YYYY');

      }

    function fetchAcllCoupon(){
        axios.get('/admin/coupons')
        .then((res)=>{
            setCoupons(res.data.results)
        })
        .catch((err)=>{
            toast.error("Soemthing went wrong...")
        })
    }

    function updateStatus(id,status){
        axios.patch(`/admin/coupon/status/${id}?status=${status}`)
        .then((res)=>{
            toast.success("Coupon updated successfully");
            fetchAcllCoupon()
        })
        .catch((err)=>{
            toast.err("Something wen't wrong...")
        })
    }
  return (
    <div className='flex h-full'>
        <SideBar/>
        <div className="w-full p-5 h-full flex flex-col place-items-center">
            <div className='px-5 w-full h-full  py-10 font-poppins flex flex-col place-content-start bg-white shadow-xl rounded-xl'>
                <div className="w-full px-5 flex place-items-center ">
                    <div className='flex place-content-between place-items-center w-full h-14'>
                        <h2 className='font-semibold font-poppins text-primaryBlue text-xl'>Coupon Management</h2>
                        <button className='bg-primaryBlue round-md text-center px-5 py-2 text-white text-light' onClick={()=>dispatch(updateCouponToggle(true))}>Create Coupon</button>
                    </div>
                </div>
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-full">
            <ToastContainer position='top-center' limit={3}></ToastContainer>
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-50">
                <tr>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Coupon Id</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Minimum Purchase</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Discount Amount</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Maximum Discount Amount</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Users allowed</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Expiry Date</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
                <th scope="col" class="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                {
                    coupons?.map((coupon,index)=>(
                        <tr class="hover:bg-gray-50" >
                            
                            <td class="px-6 py-4">
                                <div className="w-40">
                                   <p className='font-semibold text-lg text-black'>{coupon.coupon_id}</p>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <p className='teext-md'>{coupon.minimum_purchase}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p className='text-md'>{coupon.discount_amount}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p className='text-md'>{coupon.maximum_discount_amount}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p className='text-md'>{coupon.users_allowed}</p>
                            </td>
                            <td class="px-6 py-4">
                                <p className='text-md'>{formatDate(coupon.expiry_date)}</p>
                            </td>
                            <td class="px-6 py-4">
                                {
                                    coupon.status ?
                                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                                        Active
                                    </span>
                                    : 
                                     
                                    <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                                    <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                        Inactive
                                    </span>
                                }  
                            </td>
                            <td class="px-6 py-4 flex place-items-center gap-3">
                                <div className="flex place-content-around gap-5">
                                    <div className="flex flex-col place-items-center cursor-pointer" onClick={()=>dispatch(updateEditToggle({toggle:true,id:coupon._id}))}>
                                    <AiOutlineEdit size={20}></AiOutlineEdit>
                                        <p className="font-semibold ">Edit</p>
                                    </div>
                                </div>
                                <div className="flex">
                                <label class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={coupon.status}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => coupon.status ? updateStatus(coupon._id,'false'):updateStatus(coupon._id,'true')}
                                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    ></div>
                                        {
                                            !coupon.status ?
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                List
                                            </span>
                                            :
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                UnList
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
                <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                </div>
            </div>
            {
                toggle &&
                <AddCoupon fetchAcllCoupon={fetchAcllCoupon}/>
            }
            {
                editToggle.toggle &&
                <EditCoupon fetchAcllCoupon={fetchAcllCoupon}/>
            }
        </div>
        
    </div>
  )
}

export default CouponManagement