import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col place-content-center place-items-center'>
        <div className="w-full flex flex-col place-content-center place-items-center">
            <img src="/gif/notfound.gif" alt="notfound" />
            <div>
                <Link to="/" className='bg-darkPink text-white px-8 py-3 w-2/5'>Home</Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound