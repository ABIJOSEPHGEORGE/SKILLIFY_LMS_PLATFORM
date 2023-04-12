import { Route,Routes,useLocation} from 'react-router-dom'
import Login from './users/Login'
import Register from './users/Register'
import {AnimatePresence} from 'framer-motion'
import VerifyEmail from './users/VerifyEmail'
import VerifyResetPassword from './users/VerifyResetPassword'
import HomePage from '../pages/HomePage'
import PrivateRoutes, { AuthRoutes, InstructorRoutes, AdminRoutes, PrivateRoute } from './PrivateRoutes'
import { userToken } from '../helpers/user/AuthHelpers'
import axios from 'axios'
import OnboardingForm from './instructors/OnboardingForm,'
import SideMenu from './instructors/SideMenu'
import AdminLogin from './admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'
import Students from '../pages/admin/Students'
import Courses from '../pages/instructor/Courses'
import CreateCourse from '../pages/instructor/CreateCourse'
import Instrcutors from '../pages/admin/Instructors'
import ForgetPassword from './users/ForgotPassword'
import ResetPassword from './users/ResetPassword'
import CategoryManagement from '../pages/admin/CategoryManagement'
import SubcategoryManagement from '../pages/admin/SubcategoryManagement'
import InstructorDashboard from '../pages/instructor/Dashboard'



function AnimatedRoutes() {
  // //Assigning token into axios headers
  //   (function() {
  //       const user = userToken();
  //       if (user?.token) {
  //           axios.defaults.headers.common['Authorization'] = user.token;
  //           console.log("hello")
  //       } else {
  //           axios.defaults.headers.common['Authorization'] = null;
  //       }
  //   })();
    const location = useLocation();
  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
      <Route path='/' exact element={<AuthRoutes/>}>
          <Route path='/' exact element={<HomePage/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='user/confirm' element={<VerifyEmail/> }/>
          <Route path='user/reset' element={<VerifyResetPassword/>}/>
          <Route path='/admin' element={<AdminLogin/>}/>
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="instructor/onboarding" element={<OnboardingForm/>}/>
      </Route>
      
        <Route path='/user' element={<PrivateRoute role="user"/>}>
            <Route path='home' exact element={<HomePage/>}/>
        </Route>

        <Route path="/instructor" element={<PrivateRoute role="instructor"/>}>
          <Route path="dashboard" element={<InstructorDashboard/>}/>
          <Route path="courses" element={<Courses/>}/>
          <Route path='create-course' element={<CreateCourse/>}/>
        </Route>

        <Route path='/admin' element={<PrivateRoute role="admin"/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='students' element={<Students/>}/>
          <Route path='instructors' element={<Instrcutors/>}/>
          <Route path='category' element={<CategoryManagement/>}/>
          <Route path='subcategory' element={<SubcategoryManagement/>}/>
        </Route>


    </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes