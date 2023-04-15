import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses : []
}

const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        updateCourses:(state,{payload})=>{
            state.courses = payload;
        }
    }
})

export const {updateCourses } = courseSlice.actions;
export default courseSlice.reducer;