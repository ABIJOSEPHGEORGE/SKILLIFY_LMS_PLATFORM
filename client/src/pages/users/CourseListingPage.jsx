import React,{useEffect,useState} from 'react'
import NavBar from '../../components/users/NavBar'
import { Radio } from "@material-tailwind/react";
import { allCategories } from '../../redux/categorySlice'
import {useSelector,useDispatch} from 'react-redux'
import { details } from '../../config';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { updateCourses } from '../../redux/course';
import { updateFilter, updateSearchKey } from '../../redux/courseListing';
import { AiOutlineClose } from 'react-icons/ai';
import {MdOutlineNavigateNext} from 'react-icons/md'
import {GrFormPrevious} from 'react-icons/gr'

function CourseListingPage() {
    const {categories} = useSelector((state)=>state.category)
    const {courses} = useSelector((state)=>state.courses)
    const {filter} = useSelector((state)=>state.courseList);
    const [subcat,setSubcat] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams()
    const searchKey = searchParams.get("key")
    const dispatch = useDispatch()
    const [page,setPage] = useState({currentPage:1,nextPage:1,hasNextPage:0,lastPage:1})
    useEffect(()=>{
        dispatch(allCategories())
        fetchCourses()
    },[dispatch,filter,searchKey])

    function filterCourse(category){
        dispatch(updateFilter({...filter,category:category.category_name}))
        fetchSubcatgeory(category?._id)
    }

    

    function fetchCourses(){
        axios.get(`/courses/?category=${filter?.category}&sub_category=${filter?.sub_category}&price=${filter?.price}&search=${searchKey}&p=${filter?.page}&sort=${filter.sort}`)
        .then((res)=>{
            dispatch(updateCourses(res.data.results.courses));
        })
        .catch((err)=>{
            console.log(err)
            // toast.error(err.response.data.message)
        })
    }
   
    function fetchSubcatgeory(id){
        axios.get(`/user/subcategories/${id}`)
        .then((res)=>{
            setSubcat(res.data.results.sub_category)
            setPage({...page,currentPage:res.data.results.currentPage,nextPage:res.data.results.nextPage,lastPage:res.data.results.lastPage})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    console.log(page)
    const pagination = Array.from({ length:page.lastPage }, (_, index) =>index + 1);

  return (
    <div className='w-full h-full font-poppins'>
        <ToastContainer position='top-center' limit={3}></ToastContainer>
        <div className="w-full h-20  flex flex-col gap-3 place-content-between ">
            <NavBar/>
        </div>
        <div className='p-5 w-full h-full flex'>
            <div className="shadow-xl w-1/5 h-auto px-5 bg-white flex flex-col gap-5 py-5">
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-semibold '>Sort By</h2>
                    <Radio id="low-to-high" name="sort" label="Low to high"  onClick={()=>{dispatch(updateFilter({...filter,sort:1}))}}/>
                    <Radio id="high-to-low" name="sort" label="High to low"  onClick={()=>{dispatch(updateFilter({...filter,sort:-1}))}}/>
                </div>
                <h2 className='text-lg font-semibold'>Filter</h2>
                {
                    filter.category!=="All" &&
                    <div className="w-full flex flex-col">
                        <h2 className='text-lg  font-normal '>Sub Category</h2>
                        <Radio id="sub_category_all" name="sub-category" defaultChecked onClick={()=>{dispatch(updateFilter({...filter,sub_category:"All"}))}} className=' first-letter:capitalize' label={"All"}/>
                        {
                                
                            subcat?.map((item)=>(
                                <Radio id={item.sub_category_name} name="sub-category" onClick={()=>{dispatch(updateFilter({...filter,sub_category:item.sub_category_name}))}} className=' first-letter:capitalize' label={item.sub_category_name.split("-").join(" ")}/>
                            ))
                        }
                   
                    </div>
                }
                
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-normal '>Ratings</h2>
                    <Radio id="highest-rated" name="rating" label="Highest Rated"  />
                    <Radio id="newest" name="rating" label="Newest"  />
                    <Radio id="most-popular" name="rating" label="Most Popular"  />
                </div>
                
                <div className="w-full flex flex-col">
                    <h2 className='text-lg  font-normal '>Price</h2>
                    <Radio id="free" name="price" label="All" defaultChecked onClick={()=>{dispatch(updateFilter({...filter,price:"All"}))}} />
                    <Radio id="free" name="price" label="Free" onClick={()=>{dispatch(updateFilter({...filter,price:true}))}} />
                    <Radio id="preemium" name="price" label="Preemium" onClick={()=>{dispatch(updateFilter({...filter,price:false}))}} />
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 mx-3">
                <div className="w-full">
                    <h3 className='text-xl font-semibold'>Categories</h3>
                </div>
                <div className="w-full flex gap-2">
                       
                    {
                        categories?.map((category)=>(
                            <button type='button' onClick={()=>{ filterCourse(category)}} className={filter.category!==category.category_name ? "border-2 border-gray-600 px-3 py-2 hover:bg-gray-800 hover:text-white first-letter:capitalize" : "border-2 bg-gray-600 text-white px-3 py-2 first-letter:capitalize"}>{category.category_name.split("-").join(" ")}</button>
                        ))
                    }
                    {
                        filter.category!=="All" &&
                        <button type='button' onClick={()=>{dispatch(updateFilter({...filter,category:"All",sub_category:"All"}))}} className="px-10 py-2 first-letter:capitalize flex place-items-center">Clear <AiOutlineClose size={20}></AiOutlineClose></button>
                    }
                    
                    
                </div>
                <div className="w-full">
                    <h3 className='text-lg font-normal'>{courses.length} results</h3>
                
                    {
                      courses?.length > 0 ?   courses.map((course,index)=>(
                        <div className='flex flex-col gap-3'>
                            <Link to={'/course/'+course._id} className="w-full px-3 py-5 shadow-xl my-2 bg-white flex gap-5 cursor-pointer">
                                <div className='w-1/5 h-40'>
                                    <img className='w-full h-full rounded-md' src={details.base_url+course?.course_image} alt="course_image" />
                                </div>
                            <div className=' w-3/5 flex flex-col place-content-start gap-3'>
                                <h1 className='text-2xl font-semibold'>{course?.course_title}</h1>
                                <p className='text-gray-600 font-normal'>{course?.course_description}</p>
                                <div className="w-full flex flex-col gap-2 place-items-center">
                                    <div className="w-full flex gap-2 place-items-center font-semibold text-gray-700">
                                        <img className='w-10 h-10' src={course?.profile_image ? details.base_url+course?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                                        <p>{course?.tutor?.first_name} {course?.tutor?.last_name}</p>
                                    </div>
                                   <div className="flex gap-3 w-full place-content-start">
                                        <p className='text-lg font-normal line-through text-gray-600'>{'₹ '+course?.course_price}</p>
                                        <p className='text-lg font-semibold text-darkPink'>{'₹ '+course?.course_sale_price}</p>
                                   </div>
                                </div>
                            </div>
                            
                        </Link>
                        
                        </div>
                        ))
                        :
                        <div className="w-full flex flex-col place-content-center place-items-center">
                            <img className='w-2/5' src="/no-results.gif" alt="no_results_found" />
                            <p className='text-xl font-semibold'>No matching results found</p>
                        </div>
                    }
                    <div className='w-full flex p-5 place-items-center place-content-center'>
                            {
                                page.currentPage>1 ?
                                <GrFormPrevious size={20}></GrFormPrevious>
                                :null
                            }
                            {
                               pagination.map((_,index)=>(
                                    <li className={page.currentPage===index+1 ?"list-none p-3 text-darkPink font-semibold cursor-pointer" : "list-none p-3 text-darkPink font-semibold cursor-pointer"} onClick={()=>{dispatch(updateFilter({...filter,page:index+1}))}}>{index+1}</li>
                               ))
                            }
                            {
                                page.hasNextPage!==0 ?
                                <MdOutlineNavigateNext size={20}></MdOutlineNavigateNext>
                                :null
                            }
                        </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseListingPage