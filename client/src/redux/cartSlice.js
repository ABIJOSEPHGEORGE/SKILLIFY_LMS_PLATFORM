import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    cart:[],
    error:null,
    subTotal:0,
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
    },
    reducers:{
        updateSubTotal:(state,action)=>{
            state.subTotal = action.payload;
        }
    }
})
export const {updateSubTotal} = cartSlice.actions;
export default cartSlice.reducer;