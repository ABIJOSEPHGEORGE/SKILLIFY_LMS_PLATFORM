import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin'
import authSlice from './authSlice'
import categorySlice from './categorySlice'
import createCourseSlice from './createCourse'
import courseSlice from './course'
export default configureStore({
  reducer: {
    admin: adminReducer,
    auth : authSlice,
    category:categorySlice,
    createCourse:createCourseSlice,
    courses:courseSlice,
  },
})