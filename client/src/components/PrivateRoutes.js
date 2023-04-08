import { Navigate, Outlet,redirect} from "react-router-dom";
import { adminToken, userToken } from "../helpers/user/AuthHelpers";
import jwt_decode from 'jwt-decode'

const PrivateRoutes = ()=>{
   const user = userToken();
    return(
        <>
            {
                user?.token ? <Outlet/> : <Navigate to='/login'/>
            }
        </>
    )
}

export const AuthRoutes =()=>{
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
    const user = userToken(); 
   
    return(
        <>
            {
                user?.token && user?.role==="instructor" ? <Outlet/> : <Navigate to="/login"/>
            }
        </>
    )
}

export const AdminRoutes = ()=>{
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
    const token = JSON.parse(localStorage.getItem('authKey'));
    const decode = jwt_decode(token)
    console.log(role)
    console.log(decode.role)
    if(role===decode.role){
        <Outlet/>
    }else if(role!==decode.role && role==='admin'){
        redirect('/admin')
    }else{
        <Navigate to='/login'/>
    }
}


export default PrivateRoutes;

