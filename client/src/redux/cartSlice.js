import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    cart:[],
    error:null,
}

export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems',async()=>{
    try{
        const response = await axios.get('/user/cart');
        return response.data.results;
    }catch(err){
        console.log(err)
    }
})


const cartSlice = createSlice({
    name:'cart',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchCartItems.pending,(state)=>{
            state.cart = [];
            state.error = null;
        })
        .addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.cart = action.payload;
            state.error = null;
        })
        .addCase(fetchCartItems.rejected,(state)=>{
            state.cart = [];
            state.error = null;
        })
    }
})

export default cartSlice.reducer;