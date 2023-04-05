import axios from 'axios'
import {Navigate} from 'react-router-dom'
axios.defaults.baseURL = 'http://localhost:3001'


//Handling user registration
export const userRegister = async (values)=>{
   const response= await axios.post('/register',values);
    return response;
}

//Handling email verification
export const emailVerification = async (data)=>{
    const response = await axios.post('/verify-email',data);
    return response;
}

// Handling the resend email 
export const resendEmail = async (user) =>{
    const response = await axios.get(`/resend-email/${user}`);
    return response;
}

//Handling the user login
export const userLogin = async(values)=>{
    const response = await axios.post('/login',values);

    return response;
} 


//Token verification
export const userToken = () =>{
         // getting the token from localstorage
        const user = JSON.parse(localStorage.getItem('authKey'));
        return user;
}

//admin token
export const adminToken = ()=>{
    //getting the token from localstorage
    const admin = JSON.parse(localStorage.getItem('admin'));
    return admin;
}

//updating the user role
export const updateRole =(role)=>{
    const user = JSON.parse(localStorage.getItem('authKey'));
    user.role = role;
    const updated = JSON.stringify(user)
    localStorage.setItem('authKey',updated);
}

//instructor signup

export const instructorSignup = async(values)=>{
    const response = await axios.post('http://localhost:3001/instructor/signup',values);
    return response;
}

