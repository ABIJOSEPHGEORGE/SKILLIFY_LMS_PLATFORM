import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin'
import authSlice from './authSlice'
import categorySlice from './categorySlice'
export default configureStore({
  reducer: {
    admin: adminReducer,
    auth : authSlice,
    category:categorySlice,
  },
})