import { Navigate, Outlet} from "react-router-dom";
import { adminToken, userToken } from "../helpers/user/AuthHelpers";

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

export default PrivateRoutes;

