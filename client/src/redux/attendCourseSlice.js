import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    course:null,
    course_progress:[],
}

const attendCourseSlice = createSlice({
    name:'attendCourse',
    initialState,
    reducers:{
        updateToggle:(state,action)=>{
            state.toggle = action.payload;
        },
        updateCourse:(state,action)=>{
            state.course = action.payload;
        },
        updateCourseProgress:(state,action)=>{
            state.course_progress = action.payload;
        }
    }
})

export const {updateToggle,updateCourse,updateCourseProgress} = attendCourseSlice.actions;
export default attendCourseSlice.reducer;