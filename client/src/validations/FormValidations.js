import * as Yup from 'yup';
import { useSelector } from 'react-redux';

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
    }
    else{
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


export const CourseCreationValidation=(formData,step)=>{
    if(step===0 && formData.course_title.trim()===""){
        return {course_title:'Course title is required'}
    }else if(step===0 && formData.course_subtitle.trim()===""){
        return {course_subtitle:'Sub Title is required'}
    }else if(step===0 && formData.course_description.trim()===""){
        return {course_description:'Course description is required'}
    }else if(step===0 && formData.category===""){
        return {category:'Category is required'}
    }else if(step===0 && formData.sub_category===""){
        return {sub_category:"Subcategory is required"}
    }else if(step===1 && formData.course_image===""){
        return {course_image:"Course image is required"}
    }else if(step===1 && formData.promotional_video===""){
        return {promotional_video:"Promotional video is required"}
    }else{
        return false;
    }
}

export const sectionValidation=({title,description})=>{
    if(title===""||title.trim().length===0){
        return {section_title:'Section title is required'}
    }else if(description===""||description.trim().length===0){
        return {section_description:"Section description is required"}
    }else{
        return false;
    }
}

export const lectureValidation=({title,description,video_path})=>{
    if(title==="" || title.trim().length===0){
        return {lecture_title:'Lecture title is required'}
    }else if(description==="" || description.trim().lenght===0){
        return {lecture_description:'Lecture description is required'}
    }else if(!video_path || video_path===""){
        return {video_path:'Please upload a lecture video'}
    }else{
        return false;
    }
}

export const checkoutSchema = Yup.object({
    first_name:Yup.string().trim().required("First name is required"),
    last_name:Yup.string().trim().required('Last name is required'),
    state:Yup.string().trim().required('State description is required'),
    country:Yup.string().required('Country is required'),
    email:Yup.string().email().required('Email is required'),
})

export const lectureSchema = Yup.object({
    title:Yup.string().trim().required("Title is required"),
    description:Yup.string().trim().required('Description is required')
})

export const profileValidation = Yup.object({
    first_name:Yup.string().trim().required("First Name is required"),
    last_name:Yup.string().trim().required("Last Name is required"),
    email:Yup.string().email().trim().required("Email is required"),
    description:Yup.string().trim()
})

export const resetPasswordSchema = Yup.object({
    existing_password:Yup.string().trim().required("Existing password is required"),
    new_password:Yup.string().trim().required("New password is required"),
    confirm_new_password:Yup.string().trim().oneOf([Yup.ref('new_password'), null], "Passwords don't match").required('Confirm new password is required'),
})

export const couponSchema = Yup.object({
    coupon_id:Yup.string().trim().required("Coupon id is required"),
    minimum_purchase:Yup.number().required("Minimum purchase is required"),
    users_allowed:Yup.number().required("Maximum users allowed is required"),
    discount_amount:Yup.number().required("Discount amount is required"),
    maximum_discount_amount:Yup.number().required("Maximum discount amount is required"),
    expiry_date:Yup.date().required("Coupon expiry date is required"),
})