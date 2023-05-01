import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    course:null,
    course_progress:[],
    active_progress:{session:1,content:1},
    video:{},
    content_type:'',
    video_progress:{video_id:null,progress:null,watched:null},

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
        },
        updateActiveProgress:(state,action)=>{
            state.active_progress = action.payload;
        },
        updateVideoPath:(state,action)=>{
            state.video = action.payload;
        },
        updateContentTye:(state,action)=>{
            state.content_type = action.payload;
        },
        updateVideoProgress:(state,action)=>{
            state.video_progress = action.payload;
        }
    
    }
})

export const {updateToggle,updateCourse,updateCourseProgress,updateActiveProgress,updateVideoPath
    ,updateContentTye,updateVideoProgress} = attendCourseSlice.actions;
export default attendCourseSlice.reducer;