import React,{useEffect, useRef, useState} from 'react'
import Avatar from 'react-avatar-edit'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfileImage } from '../../../redux/profileSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { details } from '../../../config'


function ProfileImage() {
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState(null)
    const [blob,setBlob] = useState(null)
    const dispatch = useDispatch()
    const {profile_image} = useSelector((state)=>state.profile)


    const onClose=()=>{
      setPreview(null)
    }

    const onCrop=(view)=>{
      setPreview(view)
    }

    useEffect(()=>{
      function dataURItoBlob(dataURI) {
        let mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
           array.push(binary.charCodeAt(i));
        }
        console.log(mime)
        return new Blob([new Uint8Array(array)], {type: mime});
      }
      if(preview){
        setBlob(dataURItoBlob(preview))
        const objecturl = URL.createObjectURL(dataURItoBlob(preview));
        dispatch(updateProfileImage(objecturl))
      }
      
    },[preview])


    const handleUpload = ()=>{
      const type = blob.type;
        const file = new File([blob],'profile_image',{type});
        const form = new FormData()
        form.append('profile_image',file)
        console.log(file)
        axios.patch('/user/account/profile-image',form)
        .then((res)=>{
          const profile_url = details.base_url+res.data.results;
          dispatch(updateProfileImage(profile_url))
          setPreview(null)
          toast.success(res.data.message)
        })
        .catch((err)=>{
          toast.error("Something wen't wrong...")
        })
    }
      
  return (
    <div className='w-full'>
        <div className='w-full'>
            <h1 className='font-bold text-3xl'>Update Profile Image</h1>
        </div>
        <div className=" py-10 w-4/5 flex flex-col gap-4">
           
              <Avatar className="ps-10"
                  width={400}
                  height={300}
                  onCrop={onCrop}
                  onClose={onClose}
                  src={image}
                />
           
           
           
           <div className="w-full flex place-content-start">
                <button type='button' className='bg-black text-white font-semibold text-md px-5 py-4 w-1/6 text-center ' onClick={()=>{handleUpload()}}>Save</button>
            </div>
        </div>
    </div>
  )
}

export default ProfileImage