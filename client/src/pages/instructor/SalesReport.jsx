import React, { useEffect, useState } from 'react'
import SideMenu from '../../components/instructors/SideMenu'
import axios from 'axios'
import { Input } from '@material-tailwind/react'
import { useFormik } from 'formik'
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify'

function SalesReport() {

 

    const {handleSubmit,handleBlur,handleChange,values,errors} = useFormik({
        initialValues:{
            from:'',
            to:'',
        },
        onSubmit:(values)=>{
          
            getSalesReport(values)
        }
    })

    async function getSalesReport(values) {
        try {
          const res = await axios.get(`/instructor/sales-report?from=${values.from}&to=${values.to}`);
          res.data.results.forEach((ele) => {
            const { billing_address, ...rest } = ele;
            Object.assign(ele, billing_address, rest);
            delete ele.billing_address;
          });
         
    
          // Trigger CSV download
          const csvData = Papa.unparse(res.data.results); // Convert arrayData to CSV format
          const csvBlob = new Blob([csvData], { type: 'text/csv' }); // Create a Blob object
    
          const csvUrl = URL.createObjectURL(csvBlob); // Create a URL for the Blob
          const link = document.createElement('a'); // Create a link element
          link.href = csvUrl;
          link.download = 'sales_report.csv'; // Set the file name for the download
    
          link.click(); // Simulate a click on the link to start the download
        } catch (err) {
          toast.error('Unable to download sales report...')
        }
      }
  return (
    <div className='flex'>
        <ToastContainer position='top-center' limit={2}></ToastContainer>
    <SideMenu/>
    <div className='px-5 w-full h-full mx-5  py-10 font-poppins flex flex-col place-content-start place-items-center bg-white shadow-xl rounded-xl'>
        <div className=" h-20 w-full flex place-content-start place-items-center px-5">
            <h3 className='font-semibold text-primaryViolet text-2xl text-start'>Sales Report</h3>
        </div>
        <div className='w-full px-5 flex flex-col gap-5' >
            <h3 className='text-md font-semibold'>Select the date range</h3>
            <form className='flex flex-col  gap-3 ' onSubmit={handleSubmit}>
                <div className='flex place-content-between gap-4'>
                    <div className="w-3/5">
                        <Input label='Select the date from' variant='static' type='date' name='from' onChange={handleChange} onBlur={handleBlur} value={values.from} />
                    </div>
                    <div className="w-3/5">
                        <Input label='Select the date to' variant='static' type='date' name='to' onChange={handleChange} onBlur={handleBlur} value={values.to} />
                    </div>
                </div>
                <div className="w-full">
                    
                    <button className='text-white bg-primaryBlue px-4 py-3 w-1/6' type='submit'>Download Report</button>
                 
                </div>
            </form>
            
        </div>
    </div>
    </div>
  )
}

export default SalesReport