import React, { useEffect, useState } from 'react';
import NavBar from '../../components/users/NavBar';
import { Radio } from "@material-tailwind/react";
import { allCategories } from '../../redux/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { details } from '../../config';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { updateCourses } from '../../redux/course';
import { updateFilter, updateSearchKey } from '../../redux/courseListing';
import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineNavigateNext } from 'react-icons/md';
import {BiSortDown} from 'react-icons/bi'
import {HiFilter} from 'react-icons/hi'
import { GrFormPrevious } from 'react-icons/gr';
import Footer from '../../components/users/Footer';
import Loader from '../../components/utils/Loader';
import { updateLoading } from '../../redux/authSlice';

function CourseListingPage() {
  const { categories } = useSelector((state) => state.category);
  const { courses } = useSelector((state) => state.courses);
  const { filter } = useSelector((state) => state.courseList);
  const [subcat, setSubcat] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKey = searchParams.get("key");
  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState({ currentPage: 1, nextPage: 1, hasNextPage: 0, lastPage: 1 });
  const [showFilters, setShowFilters] = useState(false);
  const [showSorting, setShowSorting] = useState(false);

  useEffect(() => {
    dispatch(allCategories());
    fetchCourses();
  }, [dispatch, filter, searchKey]);

  function filterCourse(category) {
    dispatch(updateFilter({ ...filter, category: category.category_name }));
    fetchSubcatgeory(category?._id);
  }

  function fetchCourses() {
    dispatch(updateLoading(true));
    axios.get(`/courses/?category=${filter?.category}&sub_category=${filter?.sub_category}&price=${filter?.price}&search=${searchKey}&p=${filter?.page}&sort=${filter.sort}`)
      .then((res) => {
        dispatch(updateCourses(res.data.results.courses));
        setPage({ ...page, currentPage: res.data.results.currentPage, nextPage: res.data.results.nextPage, lastPage: res.data.results.lastPage });
        dispatch(updateLoading(false));
      })
      .catch((err) => {
        dispatch(updateLoading(false));
        toast.error("Something went wrong...");
      });
  }

  function fetchSubcatgeory(id) {
    axios.get(`/subcategories/${id}`)
      .then((res) => {
        setSubcat(res.data.results.sub_category);
        setPage({ ...page, currentPage: res.data.results.currentPage, nextPage: res.data.results.nextPage, lastPage: res.data.results.lastPage });
      })
      .catch((err) => {
        toast.error("Something went wrong...");
      });
  }


  const pagination = Array.from({ length: page.lastPage }, (_, index) => index + 1);

  return (
    <div className='w-full h-full font-poppins relative'>
      <ToastContainer position='top-center' limit={3}></ToastContainer>
      <div className="w-full h-20  flex flex-col gap-3 place-content-between ">
        <NavBar />
      </div>
      <div className='p-5 w-full h-full min-h-screen flex flex-col lg:flex-col'>
        {/* <div className="flex place-content-start">
          <h1 className='font-semibold text-center text-4xl font-poppins'>Courses</h1>
        </div> */}
      <div className=' w-full lg:w-full h-auto px-5 flex lg:flex-col gap-5 py-5'>
      <div className="flex flex-col gap-4">
      <div className="w-full">
            <h3 className='text-xl font-semibold'>Categories</h3>
          </div>
          <div className="w-full flex flex-wrap gap-2">
            {categories?.map((category) => (
              <button
                key={category.category_name}
                type='button'
                onClick={() => { filterCourse(category) }}
                className={filter.category !== category.category_name ? "border-2 border-gray-600 px-3 py-2 hover:bg-gray-800 hover:text-white first-letter:capitalize" : "border-2 bg-gray-600 text-white px-3 py-2 first-letter:capitalize"}
              >
                {category.category_name.split("-").join(" ")}
              </button>
            ))}
            {filter.category !== "All" && (
              <button
                type='button'
                onClick={() => { dispatch(updateFilter({ ...filter, category: "All", sub_category: "All" })) }}
                className="px-10 py-2 first-letter:capitalize flex place-items-center"
              >
                Clear <AiOutlineClose size={20} />
              </button>
            )}
          </div>
              <div className="flex">
          
          <div className='w-auto lg:w-auto lg:mr-4 flex flex-col gap-3 relative '>
            <button
              type='button'
              onClick={() => setShowSorting(!showSorting)}
              className='w-full py-2 text-left first-letter:capitalize text-lg font-semibold flex gap-2 place-items-center'
            >
              Sort
              <BiSortDown size={20}/>
            </button>
            {showSorting && (
              <div className='w-80  flex absolute top-10 left-0 bg-white p-3 shadow-xl rounded flex-col gap-2'>
                <Radio
                  id='low-to-high'
                  name='sort'
                  label='Low to high'
                  defaultChecked
                  checked = {filter.sort===1}
                  onClick={() => {
                    dispatch(updateFilter({ ...filter, sort: 1 }));
                    setShowSorting(false);
                  }}
                />
                <Radio
                  id='high-to-low'
                  name='sort'
                  label='High to low'
                  checked = {filter.sort===-1}
                  onClick={() => {
                    dispatch(updateFilter({ ...filter, sort: -1 }));
                    setShowSorting(false);
                  }}
                />
              </div>
            )}
          </div>
          <div className='w-1/5 flex flex-col lg:flex-col gap-3 relative'>
            <button
              type='button'
              onClick={() => setShowFilters(!showFilters)}
              className=' py-2  w-full text-left text-lg font-semibold flex gap-2 place-items-center'
            >
              Filter
            <HiFilter size={20} />
            </button>
            {showFilters && (
              <div className='flex flex-col gap-2 w-80  absolute  bg-white rounded shadow-xl  left-0 top-10  p-3'>
                {filter.category !== 'All' && (
                  <div className='w-full flex flex-col'>
                    <h2 className='text-lg font-normal'>Sub Category</h2>
                    <Radio
                      id='sub_category_all'
                      name='sub-category'
                      defaultChecked
                      checked = {filter.sub_category==="All"}
                      onClick={() => {
                        dispatch(updateFilter({ ...filter, sub_category: 'All' }));
                        setShowFilters(false);
                      }}
                      className='first-letter:capitalize'
                      label={'All'}

                    />
                    {subcat?.map((item) => (
                      <Radio
                        id={item.sub_category_name}
                        name='sub-category'
                        checked = {filter.sub_category===item.sub_category_name}
                        onClick={() => {
                          dispatch(updateFilter({ ...filter, sub_category: item.sub_category_name }));
                          setShowFilters(false);
                        }}
                        className='first-letter:capitalize'
                        label={item.sub_category_name.split('-').join(' ')}
                      />
                    ))}
                  </div>
                )}

                <div className='w-full flex flex-col'>
                  <h2 className='text-lg font-normal'>Price</h2>
                  <Radio
                    id='free'
                    name='price'
                    label='All'
                    defaultChecked
                    checked = {filter.price==="All"}
                    onClick={() => {
                      dispatch(updateFilter({ ...filter, price: 'All' }));
                      setShowFilters(false);
                    }}
                  />
                  <Radio
                    id='free'
                    name='price'
                    label='Free'
                    checked = {filter.price===true}
                    onClick={() => {
                      dispatch(updateFilter({ ...filter, price: true }));
                      setShowFilters(false);
                    }}
                    value={filter.price}
                  />
                  <Radio
                    id='paid'
                    name='price'
                    label='Paid'
                    checked = {filter.price===false}
                    onClick={() => {
                      dispatch(updateFilter({ ...filter, price: false }));
                      setShowFilters(false);
                    }}
                  />
                </div>

                
              </div>
            )}
          </div>
              </div>
              </div>
        </div>



        

        <div className="w-full lg:w-full flex flex-col gap-4 mx-3">
          
          <div className="w-full">
            <h3 className='text-lg font-normal'>{courses.length} results</h3>
            {courses?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {courses.map((course, index) => (
                  <Link
                    to={'/course/' + course._id}
                    key={course._id}
                    className="px-3 py-5 shadow-xl bg-white flex flex-col lg:flex-row gap-5 cursor-pointer"
                  >
                    <div className='w-full lg:w-1/5  h-40'>
                      <img className='w-full h-full rounded-md' src={details.base_url + course?.course_image} alt="course_image" />
                    </div>
                    <div className='w-full lg:w-3/5 flex flex-col place-content-start gap-3'>
                      <h1 className='text-2xl font-semibold'>{course?.course_title}</h1>
                      <p className='text-gray-600 font-normal'>{course?.course_description}</p>
                      <div className="w-full flex flex-col gap-2 place-items-center">
                        <div className="w-full flex gap-2 place-items-center font-semibold text-gray-700">
                          <img className='w-10 h-10' src={course?.tutor?.profile_image ? details.base_url + course?.tutor?.profile_image : '/tutor_avatar.png'} alt="tutor_profile" />
                          <p>{course?.tutor?.first_name} {course?.tutor?.last_name}</p>
                        </div>
                        <div className="flex gap-3 w-full place-content-start">
                          <p className='text-lg font-normal line-through text-gray-600'>{'₹ ' + course?.course_price}</p>
                          <p className='text-lg font-semibold text-darkPink'>{'₹ ' + course?.course_sale_price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="w-full flex flex-col place-content-center place-items-center">
                <img className='w-2/5' src="/no-results.gif" alt="no_results_found" />
                <p className='text-xl font-semibold'>No matching results found</p>
              </div>
            )}
            <div className='w-full flex p-5 place-items-center place-content-center'>
              {page.currentPage > 1 ? (
                <GrFormPrevious size={20} />
              ) : null}
              {pagination.map((_, index) => (
                <li
                  key={index}
                  className={page.currentPage === index + 1 ? "list-none p-3 text-darkPink font-semibold cursor-pointer" : "list-none p-3 text-darkPink font-semibold cursor-pointer"}
                  onClick={() => { dispatch(updateFilter({ ...filter, page: index + 1 })) }}
                >
                  {index + 1}
                </li>
              ))}
              {page.hasNextPage !== 0 ? (
                <div className="cursor-pointer" onClick={() => { dispatch(updateFilter({ ...filter, page: 1 })) }}>
                  <MdOutlineNavigateNext size={20}></MdOutlineNavigateNext>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {loading &&
        <Loader />
      }
    </div>
  );
}

export default CourseListingPage;
