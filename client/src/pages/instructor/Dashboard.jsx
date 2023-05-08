import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


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
              <ResponsiveContainer width="100%" aspect={3}>
              <AreaChart
                width={500}
                height={200}
                data={data}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
              </ResponsiveContainer>
            </div>
        </div>
        </div>
    </div>
  )
}

export default InstructorDashboard