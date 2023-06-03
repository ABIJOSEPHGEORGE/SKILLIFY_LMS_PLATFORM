import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsCart3, BsChevronDown } from 'react-icons/bs';
import {FiSearch} from 'react-icons/fi'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchKey } from '../../redux/courseListing';
import { userToken } from '../../helpers/user/AuthHelpers';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import { details } from '../../config';
import {GetAndDecode} from 'react-hook-collections'


function NavBar() {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const { searchKey } = useSelector((state) => state.courseList);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchInput = searchParams.get('key');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu visibility
  const [mobileSearch, setMobileSearch] = useState(false)

  useEffect(() => {
    if (search === '' && searchInput) {
      setSearch(searchInput);
    }
  }, []);

  function searchCourse(e) {
    if (e.key === 'Enter') {
      navigate(`/courses?key=${search}`);
    }
  }


  useEffect(() => {
      try{
        const decode = GetAndDecode('authKey')
        setUser(decode)
      }catch(err){
        setUser(null)
      }
  }, []);



  

  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('authKey');
    navigate('/login', { replace: true });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu state
  };

  return (
    <nav className="border-gray-200 bg-white bg-opacity-5">
      <div className="flex flex-wrap place-items-center place-content-between flex-1 p-5">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="skillify Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Skillify
            </span>
          </Link>
          <div className="w-4/5 px-10 rounded-3xl border-2 border-gray-800 py-2 place-items-center ms-20 hidden xl:flex">
            <AiOutlineSearch size={20} className='text-black'/>
            <input
              type="text"
              className="focus:outline-none ms-2 bg-transparent placeholder:text-black"
              value={search}
              placeholder="search for courses"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                searchCourse(e);
              }}
            />
          </div>
        </div>
        <div className="flex flex-1 place-content-end place-items-center cursor-pointer md:px-5 xl:hidden" onClick={()=>setMobileSearch(!mobileSearch)}>
           <div className="flex place-content-center place-items-center gap-3 px-3 py-1 border-2 border-black rounded-2xl">
            <h3 className='text-black font-semibold'>Search Courses</h3>
            <FiSearch size={20} className='text-black'></FiSearch>
           </div>
          </div>
        <div className="flex max-w-2/5 place-content-end place-items-center">
        <button
  data-collapse-toggle="navbar-default"
  type="button"
  className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg xl:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 focus:outline-none focus:ring-0"
  aria-controls="navbar-default"
  aria-expanded="false"
  onClick={toggleMobileMenu}
>
  <span className="sr-only">Open main menu</span>
  {!isMobileMenuOpen ? (
    <svg
      className="w-6 h-6 transform rotate-90"
      aria-hidden="true"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
    </svg>
  ) : (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.293 5.293a1 1 0 10-1.414-1.414L12 8.586 9.121 5.707a1 1 0 10-1.414 1.414L10.586 10l-2.879 2.879a1 1 0 001.414 1.414L12 11.414l2.879 2.879a1 1 0 001.414-1.414L13.414 10l2.879-2.879a1 1 0 000-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  )}
</button>

          <div
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden' // Show/hide mobile menu based on isMobileMenuOpen state
            } w-4/5 rounded-md xl:flex xl:w-auto absolute z-50  shadow-xl xl:shadow-none right-2 top-16 xl:top-0 xl:mt-0 xl:relative bg-white xl:bg-transparent`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 xl:p-0 mt-4 border leading-10 border-gray-100 rounded-lg xl:flex-row xl:space-x-8 xl:mt-0 xl:border-0 dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-black font-semibold rounded md:bg-transparent md:hover:text-blue-700 md:text-black md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="block py-2 pl-3 pr-4 text rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-darkPink md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Courses
                </Link>
              </li>
              {
                !user ? 
                <>
                    <li>
                      <Link
                        to="/"
                        className="block py-2 pl-3 pr-4 text-gray-900 font-semibold rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Become An Instructor
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Register
                      </Link>
                    </li>
                </>
                :

                <>
                  <li>
                    {
                      user.role==="instructor" ?
                        <Link
                        to="/instructor/dashboard"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          Dashboard
                        </Link>
                        :
                        <Link
                        to="/"
                        className="block py-2 pl-3 pr-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                          Become An Instructor
                        </Link>
                    }
                    
                  </li>
                  <li>
                    <Link
                      to="/user/my-learning"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      My Learning
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/profile"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Account
                    </Link>
                  </li>
                  </>
              }
              
            </ul>
          </div>
        </div>
      </div>
      <>
      {
        mobileSearch &&
        <div className="w-full h-screen flex flex-col place-content-start py-20 place-items-center absolute top-0 left-0 bg-black bg-opacity-70 z-50" >
            <div className="w-full px-5 flex place-content-end cursor-pointer" onClick={()=>setMobileSearch(!mobileSearch)}>
              <AiOutlineCloseCircle size={30} className='text-white'></AiOutlineCloseCircle>
            </div>
            <div className="w-4/5 px-10 rounded-3xl border-2 border-white py-2 place-items-center ms-3 mt-20 flex md:mt-40 lg:hidden">
              <AiOutlineSearch size={20} className='text-white'/>
              <input
                type="text"
                className="focus:outline-none ms-2 bg-transparent text-white placeholder:text-white"
                value={search}
                placeholder="search for courses"
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                  searchCourse(e);
                }}
              />
            </div>
        </div>
      }
        
      </>
    </nav>
  );
}

export default NavBar;
