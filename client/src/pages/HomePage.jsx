import React from 'react'
import NavBar from '../components/users/NavBar'
import { userToken } from '../helpers/user/AuthHelpers'
import UserNav from '../components/users/UserNav';


function HomePage() {
  const token = userToken();
  return (
    <div className="w-full h-screen">
        <div className='absolute top-0 w-full'>
        {
          token ? <UserNav role={token?.role}/> : <NavBar/>
        }
        </div>
        <div className=' bg-bgPink w-full h-4/5 flex font-poppins' >
            <div className="flex-1 flex-col flex place-content-center place-items-center">
              <h3 className='text-3xl text-black font-semibold w-3/5 leading-10 py-3'>
                Learn more and make success the result of perfection.
              </h3>
              <p className='text-black text-lg w-3/5'>Pick from over 100,000 online video courses with new additions published every month.</p>
              <div className="w-3/5 flex py-2">
                <button className='bg-darkPink text-white font-semibold px-4 py-2 '>Course</button>
              </div>
            </div>
            <div className="flex-1 flex place-content-center place-items-center">
              <div className="w-3/5 h-4/5 p-5 mt-10">
                 <img src="/girl-img.png" className='w-full h-full' alt="home_image" />
              </div>
                
            </div>
        </div>
    </div>
    
  )
}

export default HomePage