import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter : {category:"All",sub_category:"All",price:"All"},
    searchKey:"",

}

const courseListSlice = createSlice({
    name:'courseList',
    initialState,
    reducers:{
        updateFilter:(state,action)=>{
            state.filter = action.payload;
        },
        updateSearchKey:(state,action)=>{
            state.searchKey = action.payload;
        }
    }
})

export const {updateFilter,updateSearchKey} = courseListSlice.actions;
export default courseListSlice.reducer;