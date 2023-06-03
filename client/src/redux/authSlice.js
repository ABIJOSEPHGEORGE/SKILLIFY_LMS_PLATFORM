import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from 'jwt-decode'

const initialState = {
    user:null,
    isLoggedIn:false,
    role:null,
    error:null,
    loading:true,
}

export const login = createAsyncThunk('auth/login',async (credentials)=>{
    axios.post('/login',credentials)
    .then((res)=>{
       return res.data.results.token;
    })
    .catch((err)=>{
        console.log(err)
    })
})

const authslice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        updateLoading:(state,action)=>{
            state.loading = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending,(state)=>{
            state.isLoggedIn = false;
            state.user = null;
            state.role = null;
            state.error = null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoggedIn = true;
            state.user = jwt_decode(action.payload).user;
            state.role = jwt_decode(action.payload).role;
            state.error = null;
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoggedIn = false;
            state.role = null;
            state.user = null;
            state.error = true;
        })
    }
})

export default authslice.reducer;
export const {updateLoading} = authslice.actions;