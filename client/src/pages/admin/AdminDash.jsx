import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import SideBar from '../../components/admin/SideBar'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { details } from '../../config'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";



function AdminDashboard() {
  const [data,setData] = useState(null)
  const [chartData, setChartData] = useState(null);
  const [afterPayout,setAfterPayout] = useState([])
  useEffect(() => {
    const startDate = moment().startOf('month').toDate();
    const endDate = moment().endOf('month').toDate();
  
    axios.get('/admin/dashboard/chart')
      .then((res) => {
        setChartData(res.data.results.beforePayout);
        setAfterPayout(res.data.results.afterPayout);
      })
      .catch((err) => {
        toast.error("Something went wrong...")
      });
  }, []);
  
  useEffect(()=>{
    fetchContent()
  },[])

  function fetchContent(){
    axios.get('/admin/dashboard')
    .then((res)=>{
        setData(res.data.results)
    })
    .catch((err)=>{
      toast.error("Something went wrong...")
    })
  }
  return (
    <div className='flex'>
        <SideBar/>
        <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className=" h-20 w-full flex place-content-start place-items-center px-5">
                <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Dashboard</h3>
            </div>
        

        <div class="overflow-hidden  m-5 w-full">
          <ToastContainer position='top-center' limit={3}></ToastContainer>
            <div className="w-full h-uto flex place-items-center place-content-between gap-3">
              <div className="bg-white w-3/6 h-40 shadow-xl p-5 m-3 rounded-md flex flex-col">
                 <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.totalCourses}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Total Courses</h3>
                 </div>
              </div>
              <div className="bg-white w-3/6 h-40 shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.instructors}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Registered Instructors</h3>
                 </div>
              </div>
              <div className="bg-white w-3/6 h-40 shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.students}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Total Students</h3>
                 </div>
              </div>
              <div className="bg-white w-3/6 h-40  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.afterAdmin}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Total Revenue</h3>
                 </div>
              </div>
              <div className="bg-white w-3/6 h-40  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.totalAmount}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Total Sales</h3>
                 </div>
              </div>
            </div>
           <div className="w-full flex place-content-between">
              <div className="w-full h-full mt-10">
                <h3 className="font-semibold">Before Payout</h3>
              <AreaChart
                  width={500}
                  height={400}
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="bill_amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </div>
              <div className="w-full h-full mt-10">
                <h3 className="font-semibold">After Payout</h3>
              <AreaChart
                  width={500}
                  height={400}
                  data={afterPayout}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="bill_amount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </div>
           </div>
            
        </div>
        </div>
    </div>
  )
}

export default AdminDashboard