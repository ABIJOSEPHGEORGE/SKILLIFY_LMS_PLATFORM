import React,{useEffect} from 'react'
import NavBar from '../../components/users/NavBar'
import { Radio } from "@material-tailwind/react";
import { allCategories } from '../../redux/categorySlice'
import {useSelector,useDispatch} from 'react-redux'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { updateCourses } from '../../redux/course';

function CourseListingPage() {
    const {categories} = useSelector((state)=>state.category)
    const {courses} = useSelector((state)=>state.courses)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(allCategories())
        fetchCourses()
    },[])

    function fetchCourses(){
        axios.get(`/courses`)
        .then((res)=>{
            dispatch(updateCourses(res.data.results));
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
        })
    }


  return (
    <div className='w-full h-full font-poppins'>
        <ToastContainer position='top-center' limit={3}></ToastContainer>
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
                <Menu>
            <MenuHandler>
              <li className='font-normal list-none cursor-pointer flex gap-3 place-items-center'>Categories </li>
            </MenuHandler>
            <MenuList>
              {
                categories.map((category)=>(
                  <MenuItem className='first-letter:capitalize letter-spacing: 0.025em;'>{category.category_name.split("-").join(" ")}</MenuItem>
                ))
              }
            </MenuList>
        </Menu>
                </div>
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
                    <h3 className='text-xl font-semibold'>Categories</h3>
                </div>
                <div className="w-full flex gap-2">
                    {
                        categories.map((category)=>(
                            <button className='border-2 border-gray-600 px-3 py-2 hover:bg-gray-800 hover:text-white first-letter:capitalize'>{category.category_name.split("-").join(" ")}</button>
                        ))
                    }
                    
                </div>
                <div className="w-full">

                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseListingPage