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