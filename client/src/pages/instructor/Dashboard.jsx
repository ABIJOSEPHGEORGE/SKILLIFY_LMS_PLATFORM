import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";




function InstructorDashboard() {
  const [data,setData] = useState(null)
  const [chartData, setChartData] = useState([]);
  const [afterPayout,setAfterPayout] = useState([])

  useEffect(() => {
    const startDate = moment().startOf('month').toDate();
    const endDate = moment().endOf('month').toDate();
  
    axios.get('/instructor/dashboard/chart')
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
    axios.get('/instructor/dashboard')
    .then((res)=>{
        setData(res.data.results)
    })
    .catch((err)=>{
      toast.error("Something went wrong...")
    })
  }

 


  return (
    <div className='flex'>
        <SideMenu/>
        <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
            <div className=" h-20 w-full flex place-content-start place-items-center px-5">
                <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Dashboard</h3>
            </div>
        

        <div class="overflow-hidden  m-5 w-full">
          <ToastContainer position='top-center' limit={3}></ToastContainer>
            <div className="w-full h-uto flex place-items-center place-content-between gap-3">
              <div className="bg-white w-3/5 h-40 shadow-xl p-5 m-3 rounded-md flex flex-col">
                 <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.approved_courses}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Approved Courses</h3>
                 </div>
              </div>
              <div className="bg-white w-3/5 h-40 shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.pending_courses}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Pending Courses</h3>
                 </div>
              </div>
              <div className="bg-white w-3/5 h-40 shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.totalAmount}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Total Revenue</h3>
                 </div>
              </div>
              <div className="bg-white w-3/5 h-40  shadow-xl p-5">
              <div className="w-full h-full flex flex-col place-items-center gap-3 place-content-center">
                  <h4 className='font-semibold text-darkPink text-4xl text-center'>{data?.afterAdmin}</h4>
                  <h3 className='text-black font-semibold text-center text-2xl'>Total Payout</h3>
                 </div>
              </div>
            </div>
            <div className="w-full h-full mt-10 flex place-content-between">
              <div className='flex flex-col gap-3'>
                <h3 className='font-semibold text-md'>Weekly Sales Before Payout</h3>
                <LineChart
                  width={500}
                  height={300}
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="bill_amount" stroke="#82ca9d" />
                </LineChart>
              </div>
              <div className='flex flex-col gap-3'>
                <h3 className='font-semibold text-md'>Weekly Sales After Payout</h3>
                <LineChart
                  width={500}
                  height={300}
                  data={afterPayout}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="bill_amount" stroke="#82ca9d" />
                </LineChart>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default InstructorDashboard