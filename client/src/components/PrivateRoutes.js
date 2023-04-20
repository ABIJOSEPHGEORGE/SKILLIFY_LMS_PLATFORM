import { Navigate, Outlet,redirect, useLocation, useNavigate} from "react-router-dom";
import { adminToken, tokenAuthentication, userToken } from "../helpers/user/AuthHelpers";
import jwt_decode from 'jwt-decode'
import { useEffect } from "react";
import Login from "./users/Login";
import axios from "axios";
import { toast } from "react-toastify";

const PrivateRoutes = ()=>{
    async function decode(){
        const token = JSON.parse(localStorage.getItem('authKey'));
        const decode = await jwt_decode(token);
        return decode.role;
    }
    decode().then((res)=>{
        return(
            <>
                {
                     res==="user" ? <Outlet/> : <Navigate to='/login'/>
                }
            </>
        )
    })
    
}

export const AuthRoutes =()=>{
    const token = JSON.parse(localStorage.getItem('authKey'));
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
        }
    const user = userToken()
    return(
        <>
            {
                !user?.token ? <Outlet/> : <Navigate to='/user/home'/>
            }
        </>
    )
}

export const InstructorRoutes = ()=>{
   const decode = tokenAuthentication()
   
    return(
        <>
            {
                decode.role==="instructor" ? <Outlet/> : <Navigate to="/login"/>
            }
        </>
    )
}

export const AdminRoutes = ()=>{
    const token = JSON.parse(localStorage.getItem('authKey'));
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
        }
    const user = userToken()
    return(
        <>
        {
            user?.token && user?.role==='admin' ? <Outlet/> : <Navigate to='/admin'/>
        }
        </>
    )
}


export const PrivateRoute=({role})=>{
    const navigate = useNavigate();
    const location =  useLocation();

   try{
        //Getting the token
        const token = JSON.parse(localStorage.getItem('authKey'));
        //Attachng the token to axios headers
        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
        }
        //Decoding the token
        const decode = jwt_decode(token)
        //Handling token expiration
        if(decode.exp * 1000 < Date.now()){
            sessionStorage.setItem('redirectURL',location.pathname)
            localStorage.removeItem('authKey');
            return navigate('/login',{state:{error:'Session Expired, Please login again'}})
        }else if(role===decode.role){
            return <Outlet/>
        }else if(role!==decode.role && role==='admin'){
            redirect('/admin')
        }else if(role!==decode.role && role==="user" && decode.role==="instructor"){
            return <Outlet/>
        }else{
            return  localStorage.removeItem('authKey')
        }
   }catch(err){
        localStorage.removeItem('authKey')
        return <Login/>
   }
}


export default PrivateRoutes;

