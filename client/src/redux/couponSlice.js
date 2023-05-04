import { createSlice } from "@reduxjs/toolkit";


const couponSlice = createSlice({
    initialState:{
        toggle:false,
        editToggle:{toggle:false,id:''},
    },
    name:'couponSlice',
    reducers:{
        updateCouponToggle:(state,action)=>{
            state.toggle = action.payload;
        },
        updateEditToggle:(state,action)=>{
            state.editToggle = action.payload;
        }
    }
})

export const {updateCouponToggle,updateEditToggle} = couponSlice.actions;
export default couponSlice.reducer;