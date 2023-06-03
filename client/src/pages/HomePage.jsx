import React from 'react'
import NavBar from '../components/users/NavBar'
import { userToken } from '../helpers/user/AuthHelpers'
import UserNav from '../components/users/UserNav';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom';
import Footer from '../components/users/Footer';

function HomePage() {
  return (
    <div className="w-full h-screen relative">
      <div className='absolute top-0 w-full'>
        <NavBar />
      </div>
      <div className='flex flex-col-reverse lg:flex-row lg:p-0 bg-white w-full lg:h-4/5 font-poppins'>
        <div className="w-full  lg:mt-0 pt-5 lg:px-5 lg:flex-1 flex-col flex place-content-center place-items-center gap-5">
          <h3 className='text-4xl  lg:text-4xl xl:text-6xl text-black font-semibold w-4/5 lg:w-full leading-snug py-3'>
            Learn more and make success the result of perfection.
          </h3>
          <p className='text-black text-lg w-4/5 lg:w-full'>Pick from over 100,000 online video courses with new additions published every month.</p>
          <div className="w-4/5 lg:w-full flex py-2">
            <Link to="/courses" className='text-white font-semibold py-3 px-10 lg:px-8 lg:py-3 bg-secondary rounded-3xl'>Courses</Link>
          </div>
        </div>
        <div className="flex-1 h-full flex place-content-center place-items-center">
          <div className="lg:w-full lg:h-full">
            <img src="/home-banner-child.jpg" className='w-full h-full' alt="home_image" />
          </div>
        </div>
      </div>

      <div className="w-full flex place-content-center py-10">
        <div className="px-5 flex flex-col gap-10 place-items-center lg:flex-row">
          <h1 className='font-semibold text-2xl lg:text-4xl leading-10 lg:leading-snug lg:text-left font-poppins'>We will help you learn what you are passionate about</h1>
        </div>
      </div>

      <div className="w-full lg:flex place-content-center p-5 gap-3">
        <div className="flex flex-col-reverse lg:flex-row w-full lg:flex">
          <div className="w-full h-auto flex gap-3 place-content-center">
            <img className='w-full' src="/homepage_div.png" alt="" />
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:text-start">
          <div className="flex flex-col gap-3 p-5">
            <h3 className='text-xl lg:text-2xl font-semibold'>Go at your own pace</h3>
            <p className='text-md lg:text-lg text-gray-600'>
              You will get your own pace where you can find all the relevant courses for you. Here you can register and learn all the techniques which you want to know.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <h3 className='text-xl lg:text-2xl font-semibold'>Learn from industry experts</h3>
            <p className='text-md lg:text-lg text-gray-600'>
              Our industry experts will guide you at each and every point when you are pursuing these courses. Also, if you face any issue during this, they will guide you to call over.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-5">
            <h3 className='text-xl lg:text-2xl font-semibold'>Find video courses on almost any topic</h3>
            <p className='text-md lg:text-lg text-gray-600'>
              You will get the courses related to almost all the topics which you are searching for. Also, you will find the most relevant topics as per your choice.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>

  )
}

export default HomePage
