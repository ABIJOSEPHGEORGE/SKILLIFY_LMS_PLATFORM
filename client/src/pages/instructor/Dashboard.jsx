import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import SideBar from '../../components/admin/SideBar'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { details } from '../../config'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { Line } from 'react-chartjs-2';
import moment from 'moment';



function InstructorDashboard() {
  const [data,setData] = useState(null)
  const [chartData, setChartData] = useState(null);

  useEffect(()=>{
    const startDate = moment().startOf('month').toDate();
    const endDate = moment().endOf('month').toDate();

    axios.get('/instructor/dashboard/chart')
    .then(()=>{
      const ordersByDay = data.reduce((result, order) => {
        const date = moment(order.order_date).format('D MMM');
        result[date] = (result[date] || 0) + order.bill_amount;
        return result;
      }, {});
        const labels = Object.keys(ordersByDay);
        const dataPoints = Object.values(ordersByDay);
        const chartData = {
          labels,
          datasets: [
            {
              label: 'Total Orders',
              data: dataPoints,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        
        }
        setChartData(chartData);
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  
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
            <div className="w-full">
              {chartData ? <Line data={chartData} /> : <p>Loading...</p>}
            </div>
        </div>
        </div>
    </div>
  )
}

export default InstructorDashboard