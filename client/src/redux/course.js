import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courses : [],
    course:{},
    error:null,
}



const courseSlice = createSlice({
    name:'course',
    initialState,
    reducers:{
        updateCourses:(state,{payload})=>{
            state.courses = payload;
        },
        updateSingleCourse:(state,{payload})=>{
            state.course = payload;
        }
    }
})

export const {updateCourses,updateSingleCourse } = courseSlice.actions;
export default courseSlice.reducer;