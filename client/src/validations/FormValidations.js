import * as Yup from 'yup';

export const registerSchema = Yup.object({
    first_name : Yup.string().trim().required('First name is required'),
    last_name : Yup.string('Please enter a valid last name'),
    email : Yup.string().min(3).email().required('Please enter a valid email address'),
    password:Yup.string().min(5).required('Please enter a valid password'),
    confirm_password:Yup.string().required().oneOf([Yup.ref('password'),null],'Password and Confirm password must match')
})

export const loginSchema = Yup.object({
    email:Yup.string().min(3).email().required('Please enter a valid email address'),
    password:Yup.string().required('Please enter a valid password')
})

export const ForgotPasswordSchema = Yup.object({
    email:Yup.string().min(3).email().required('Please enter a valid email address')
})

export const resetPassword = Yup.object({
    password:Yup.string().required('Please enter a valid password'),
    confirm_password:Yup.string().required().oneOf([Yup.ref('password'),null],'Password and Confirm password must match')
})

export const categorySchema = Yup.object({
    category_name:Yup.string().required('Category name is required'),
    category_description:Yup.string().required('Category description is required'),
})

export const subcategorySchema = Yup.object({
    sub_category_name:Yup.string().required('Subcategory name is required'),
    sub_category_description:Yup.string().required('Subcategory description is required'),
    parent_category:Yup.string().required('Please select a category')
})

export const courseSchema = Yup.object({
    course_title:Yup.string().required("Course title is required"),
    course_subtitle:Yup.string().required('Course sub title is required'),
    course_description:Yup.string().required('Course description is required'),
    category:Yup.string().required('Course category is required'),
    sub_category:Yup.string().required('Course sub category is required'),
    
})

export const imageValidation = (image)=>{
    //checking image extension type
    if(!image){
        return {
            valid: false,
            reason:'Please upload an image'
        }
    }
    const allowedExt = ['image/png','image/jpeg','image/jpg'];
    if(!allowedExt.includes(image.type)){
        return {
            valid:false,
            reason : 'Only jpeg, jpg, png images are supported'
        }
        //checking the image size
    }else if(image.size>2097152){
        return {
            valid:false,
            reason:'Image size should be less than 2MB'
        }
    }else{
        return {
            valid:true
        }
    }
}


export const videoValidation = (video)=>{
    if(!video){
        return {
            valid: false,
            reason:'Please upload a video'
        }
    }
    const allowedExt = ['video/mov','video/mkv','video/mp4'];
    if(!allowedExt.includes(video.type)){
        return {
            valid:false,
            reason : '  Only mov, mkv and mp4 files supported'
        }
    }else{
        return {
            valid:true
        }
    }
}