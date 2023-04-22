import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courses : [],
    course:{},
    error:null,
    enrolled_courses:[]
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
        },
        updateMyLearning:(state,{payload})=>{
            state.enrolled_courses = payload;
        }
    }
})

export const {updateCourses,updateSingleCourse,updateMyLearning } = courseSlice.actions;
export default courseSlice.reducer;