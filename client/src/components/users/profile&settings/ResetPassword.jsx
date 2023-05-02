import { useFormik } from 'formik'
import React from 'react'
import { resetPasswordSchema } from '../../../validations/FormValidations'
import { Input } from '@material-tailwind/react'
import axios from 'axios'
import { toast } from 'react-toastify'

function ResetPassword() {

    const {handleSubmit,handleChange,handleBlur,resetForm,values,errors,touched} = useFormik({
        initialValues:{
            existing_password:'',
            new_password:'',
            confirm_new_password:''
        },
        validationSchema:resetPasswordSchema,
        onSubmit:values=>{
            handleResetPassword(values)
            resetForm()
        }
    })


    const handleResetPassword=(values)=>{
        axios.patch('/user/account/password',values)
        .then((res)=>{
            toast.success(res.data.message)
        })
        .catch((err)=>{
            if(err.response.data.status===403){
                toast.error(err.response.data.message)
            }else{
                toast.error("Something wen't wrong...")
            }
        })
    }

  return (
    <div className='w-full'>
        <div className='w-full'>
            <h1 className='font-bold text-3xl'>Reset Password</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col px-4 pt-10 gap-8">
            <div className="w-4/5 flex flex-col gap-4">
                <Input variant='static' color='gray' type='password' label='Existing Password' placeholder='Enter the existing password' name='existing_password' value={values.existing_password} onChange={handleChange} onBlur={handleBlur}/>
                {
                    errors.existing_password && touched.existing_password &&
                    <p className='text-sm font-normal text-deep-orange-700'>{errors.existing_password}</p>
                }
            </div>
            <div className="w-4/5 flex flex-col gap-4">
                <Input variant='static' color='gray' type='password' label='New Password' placeholder='Enter the New password' name='new_password' value={values.new_password} onChange={handleChange} onBlur={handleBlur}/>
                {
                    errors.new_password && touched.new_password &&
                    <p className='text-sm font-normal text-deep-orange-700'>{errors.new_password}</p>
                }
            </div>
            <div className="w-4/5 flex flex-col gap-4">
                <Input variant='static' color='gray'  label='Confirm New Password' placeholder='Confirm New Password' name='confirm_new_password' value={values.confirm_new_password} onChange={handleChange} onBlur={handleBlur}/>
                {
                    errors.confirm_new_password && touched.confirm_new_password &&
                    <p className='text-sm font-normal text-deep-orange-700'>{errors.confirm_new_password}</p>
                }
            </div>
            <div className="w-full">
                <button className='text-white bg-black font-semibold text-center px-5 py-3 w-1/6'>Reset</button>
            </div>
        </form>
    </div>
  )
}

export default ResetPassword