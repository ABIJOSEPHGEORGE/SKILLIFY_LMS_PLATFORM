import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='w-full bg-black p-10 '>
        <div className="flex gap-3 place-content-center">
            <Link to="/" className='text-white list-none text-xl'>Home</Link>
            <Link to="/courses" className='text-white list-none text-xl'>Courses</Link>
            <Link to="/user/cart" className='text-white list-none text-xl'>Cart</Link>
        </div>
        <div className="w-full flex place-content-center">
            <p className='text-md text-gray-600'>© 2021 Skilify Education Private Limited. All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer