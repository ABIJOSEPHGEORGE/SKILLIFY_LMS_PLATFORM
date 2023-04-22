import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    course:null,
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
        }
    }
})

export const {updateToggle,updateCourse} = attendCourseSlice.actions;
export default attendCourseSlice.reducer;