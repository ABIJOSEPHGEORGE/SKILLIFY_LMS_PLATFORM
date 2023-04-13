import axios from 'axios'
import jwtDecode from 'jwt-decode'
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
export const resendEmail = async (user,action) =>{
    const response = await axios.get(`/resend-email/${user}?action=${action}`);
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


//instructor signup

export const instructorSignup = async(values)=>{
    const response = await axios.post('/instructor/signup',values);
    return response;
}


export const tokenAuthentication = async(values)=>{
    const token = JSON.parse(localStorage.getItem('authKey'));
    const decode = await jwtDecode(token);
    console.log(decode)
    return decode;
}
