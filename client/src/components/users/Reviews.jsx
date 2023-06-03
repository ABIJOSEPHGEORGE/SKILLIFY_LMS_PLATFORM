import { Input, Textarea, useSelect } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { updateReviews } from '../../redux/course';
import TimeAgo from 'react-timeago'
import { useParams } from 'react-router-dom';
import { details } from '../../config';
import { toast } from 'react-toastify';

function Reviews() {
    const [write,setWrite] = useState(false);
    const [review,setReview]= useState({desc:"",rating:1});
    const [userDone,setUserDone] = useState(false);
    const [error,setError] = useState(null);
    const dispatch = useDispatch();
    const {reviews} = useSelector((state)=>state.courses);
    const { id } = useParams()

    useEffect(()=>{
        fetchAllReviews()
    },[])

    function fetchAllReviews(){
        axios.get(`/user/reviews/${id}`)
        .then((res)=>{
            const {reviews,average,totalReviews} = res.data.results;
            dispatch(updateReviews({reviews:reviews,average:average,total_reviews:totalReviews}));
            setUserDone(res.data.results.currentUser);
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
    }
    
    function newReview(e){
        e.preventDefault()
        setError(null)
        if(review.desc.trim() === ""){
            setError({desc:'Review is required'});
        }else{
            axios.post(`/user/review/create/${id}`,review)
            .then((res)=>{
                setWrite(false);
                fetchAllReviews()
            })
            .catch((err)=>{
                toast.error("Something went wrong...")
            })
        }
    }   

    
  return (
    <div className='w-full h-full font-poppins mt-5'>
        <div className="w-full px-5 bg-white p-4 flex h-auto gap-3 place-items-center place-content-between">
            <div className='flex gap-2 '>
                <h1 className='text-md font-semibold'>Reviews Average : </h1>
                {
                    [...Array(parseInt(reviews?.average))].map((_,index)=>(
                        <div key={index} className="inline-block mr-1">
                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="#FFCB00"></path>
                            </svg>
                        </div>
                    ))
                }
                <h2>{parseInt(reviews?.average)}</h2>
            </div>
            <h3 className='flex gap-3 font-semibold'>Total Reviews : <span className='font-normal'>{reviews?.reviews?.length}</span></h3>
            <div>
                {
                    !userDone &&
                    <button className='border-2 border-gray-400 text-gray-700 px-5 py-2 text-md font-normal' onClick={()=>setWrite(true)}>Write Review</button>
                }
                
            </div>
        </div>


        <>
        {
            reviews?.reviews?.length>0 ?
        <div className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl h-auto rounded-xl flex flex-col gap-10">
            {
                reviews?.reviews?.map((review,rindex)=>(
                <div className='w-full h-auto max-h-40 rounded-xl' key={rindex}>
                    <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-gray-200">
                    <div className="flex flex-wrap items-center">
                    <div className="avatar mr-20">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {
                                review?.profile_image ?
                                <img src={details.base_url+review?.profile_image} alt='profile_image' />
                                :
                                <img src="/person_avatar.jpeg" alt='profile_avatar' />
                            }
                            
                        </div>
                    </div>
                      <h4 className="w-full md:w-auto text-xl font-heading font-medium">{review?.user_name}</h4>
                      <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-gray-200"></div>
                      <span clasNames="mr-4 text-xl font-heading font-medium">{review?.rating}/5</span>
                      <div className="flex gap-1 ml-3">
                      {
                            [...Array(parseInt(review?.rating))].map((_,index)=>(
                                <div key={index} className="flex mr-1">
                                    <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill="#FFCB00"></path>
                                    </svg>
                                </div>
                            ))
                        }
                          
                      </div>
                    </div>
                  </div>
             
      
            <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
                <div className="flex flex-wrap">
                <div className="w-full md:w-2/3 mb-6 md:mb-0">
                    <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">{review?.review}</p>
                    
                </div>
                <div className="w-full md:w-1/3 text-right">
                    <TimeAgo className='mb-8 text-sm text-gray-600 ' date={review.createdAt} />
                </div>
                </div>
            </div>
            </div>
               ))
            }
    </div>
    :
    <div className='w-full flex flex-col place-content-start place-items-center'>
        <img src="/no-reviews.gif" alt="no-reviews" className='w-1/5' />
        <h1 className="text-md font-semibold ">Be the first one to write a review</h1>
    </div>
    }
    </>
    {
        write &&
        <div className='w-full h-full absolute top-0 bg-black bg-opacity-5 flex flex-col place-content-center place-items-center'> 
            <div className="bg-white w-3/5 p-5 rounded-md gap-3 flex flex-col">
                <div className="flex place-content-end">
                    <AiOutlineCloseCircle size={20} className=' cursor-pointer' onClick={()=>{setWrite(false)}}></AiOutlineCloseCircle>
                </div>
                <h1 className='text-center font-semibold text-lg'>Write Review</h1>
                <form className='flex flex-col gap-6' onSubmit={(e)=>{newReview(e)}}>
                   
                    <div className="rating">
                        <h2 className='pe-1'>Rate</h2>
                        <input type="radio" name="rating-2" value="1" onChange={(e)=>setReview({...review,rating:e.target.value})} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value="2" onChange={(e)=>setReview({...review,rating:e.target.value})} className="mask mask-star-2 bg-orange-400"/>
                        <input type="radio" name="rating-2" value="3" onChange={(e)=>setReview({...review,rating:e.target.value})} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value="4" onChange={(e)=>setReview({...review,rating:e.target.value})} className="mask mask-star-2 bg-orange-400" />
                        <input type="radio" name="rating-2" value="5" onChange={(e)=>setReview({...review,rating:e.target.value})} className="mask mask-star-2 bg-orange-400" />
                    </div>
                    <div className="flex flex-col">
                        <Textarea value={reviews?.desc} onChange={(e)=>setReview({...review,desc:e.target.value})} label='Write your review' name='review' color='gray' placeholder='Enter your review about this course' variant="static"/>
                        {
                            error?.desc &&
                            <p className='text-red-500 text-sm text-start'>{error?.desc}</p>
                        }
                    </div>
                    
                    <button className='bg-black text-white px-5 py-2' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    }
    </div>
    
  )
}

export default Reviews