import React from 'react'
import NavBar from '../../components/users/NavBar'
import { Radio } from "@material-tailwind/react";

function CourseListingPage() {
  return (
    <div className='w-full h-full font-poppins'>
        <div className="w-full h-40  flex flex-col gap-3 place-content-between">
            <NavBar/>
            
        </div>
        <div className='p-5 w-full h-full flex'>
            <div className="shadow-xl w-1/5 h-full px-5 bg-white flex flex-col gap-5 py-5">
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-semibold '>Sort By</h2>
                    <Radio id="highest-rated" name="sort" label="Highest Rated"  />
                    <Radio id="newest" name="sort" label="Newest"  />
                    <Radio id="most-popular" name="sort" label="Most Popular"  />
                </div>
                <h2 className='text-lg font-semibold'>Filter</h2>
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-normal '>Ratings</h2>
                    <Radio id="highest-rated" name="rating" label="Highest Rated"  />
                    <Radio id="newest" name="rating" label="Newest"  />
                    <Radio id="most-popular" name="rating" label="Most Popular"  />
                </div>
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-normal '>Sub Category</h2>
                    <Radio id="highest-rated" name="sub-category" label="Highest Rated"  />
                </div>
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-normal '>Price</h2>
                    <Radio id="free" name="price" label="Free"  />
                    <Radio id="preemium" name="price" label="Preemium"  />
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 mx-3">
                <div className="w-full">
                    <h2 className='text-4xl font-bold '>Development Courses</h2>
                </div>
                <div className="w-full">
                    courses
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseListingPage