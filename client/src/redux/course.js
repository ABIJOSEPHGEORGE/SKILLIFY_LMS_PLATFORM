import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courses : [],
    course:{},
    error:null,
    enrolled_courses:[],
    reviews:{reviews:[],total_reviews:0,average:0}
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
        },
        updateReviews:(state,action)=>{
            state.reviews = action.payload;
        }
    }
})

export const {updateCourses,updateSingleCourse,updateMyLearning,updateReviews } = courseSlice.actions;
export default courseSlice.reducer;