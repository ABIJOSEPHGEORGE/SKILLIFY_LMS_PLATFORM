import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter : {category:"All"},

}

const courseListSlice = createSlice({
    name:'courseList',
    initialState,
    reducers:{
        updateFilter:(state,action)=>{
            state.filter = action.payload;
        }
    }
})

export const {updateFilter} = courseListSlice.actions;
export default courseListSlice.reducer;