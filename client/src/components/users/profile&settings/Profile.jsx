import { Input, Textarea } from '@material-tailwind/react'
import axios from 'axios'
import { useFormik } from 'formik'
import React,{useEffect, useState}from 'react'
import { profileValidation } from '../../../validations/FormValidations'
import { toast } from 'react-toastify'

function Profile() {
    const [profile,setProfile] = useState()

    useEffect(()=>{
        fetchUserData()
    },[])

    function fetchUserData(){
        axios.get('/user/account')
        .then((res)=>{
        
            setProfile(res.data.results)
         
        })
        .catch((err)=>{
            toast.error("Something went wrong...")
        })
    }

    const {handleChange,handleSubmit,handleBlur,touched,values,errors} = useFormik({
        enableReinitialize: true,
        initialValues:{
            first_name:profile?.first_name,
            last_name:profile?.last_name,
            description:profile?.description,
            email:profile?.email,
        },
        validationSchema:profileValidation,
        onSubmit:(values)=>{
            updateProfileInfo(values)
        }
    })


    function updateProfileInfo(values){
        axios.put('/user/account',values)
        .then((res)=>{
            fetchUserData();
            toast.success("Profile updated successfully...")
        })
        .catch((err)=>{
            toast.error("Something wen't wrong...")
        })
    }

  return (
    <div className='w-full'>
        <div className='w-full'>
                    <h1 className='font-bold text-3xl'>Profile & Setting's</h1>
                </div>
                <form className="w-4/5 py-10 flex flex-col place-items-start gap-8" onSubmit={handleSubmit}>
                    <div className="w-full flex flex-col gap-3">
                        <Input defaultValue={profile?.first_name} value={values.first_name} name='first_name'  onChange={handleChange} onBlur={handleBlur} variant='static' label='First Name' placeholder='Enter your first name' size='lg' labelProps={{className:'text-lg font-normal'}} color='gray'/>
                        {
                            errors.first_name && touched.first_name &&
                            <p className='text-sm text-deep-orange-700'>{errors.first_name}</p>
                        }
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <Input defaultValue={profile?.last_name} value={values.last_name} name='last_name'  onChange={handleChange} onBlur={handleBlur} variant='static' label='Last Name' placeholder='Enter your last name' size='lg' labelProps={{className:'text-lg font-normal'}} color='gray'/>
                        {
                            errors.last_name && touched.last_name &&
                            <p className='text-sm text-deep-orange-700'>{errors.last_name}</p>
                        }
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <label htmlFor="email" className='text-gray-600 text-md'>Email</label>
                        <Input defaultValue={profile?.email} value={values.email} name='email' onChange={handleChange} onBlur={handleBlur} variant='static' label='Email' disabled={true} placeholder='Enter your last name' size='lg' labelProps={{className:'text-lg font-normal'}} color='gray'/>
                        {
                            errors.email && touched.email &&
                            <p className='text-sm text-deep-orange-700'>{errors.email}</p>
                        }
                    </div>
                    <div className="w-full flex flex-col gap-3">
                        <Textarea defaultValue={profile?.description} value={values.description}  name='description'  onChange={handleChange} onBlur={handleBlur} variant='static' label='Description'  placeholder='Description' size='lg' labelProps={{className:'text-lg font-normal'}} color='gray'/>
                        {
                            errors.description && touched.description &&
                            <p className='text-sm text-deep-orange-700'>{errors.description}</p>
                        }
                    </div>
                    <div className="w-full">
                        <button type='submit' className='bg-primary text-white font-semibold text-md px-5 py-4 w-1/6 text-center '>Save</button>
                    </div>
                </form>
    </div>
  )
}

export default Profile