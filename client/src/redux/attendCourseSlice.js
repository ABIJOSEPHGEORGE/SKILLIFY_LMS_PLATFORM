import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    course:null,
    course_progress:[],
    active_progress:{session:1,content:1},
    video_path:'',
    content_type:''
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
            state.video_path = action.payload;
        },
        updateContentTye:(state,action)=>{
            state.content_type = action.payload;
        }
    
    }
})

export const {updateToggle,updateCourse,updateCourseProgress,updateActiveProgress,updateVideoPath,updateContentTye} = attendCourseSlice.actions;
export default attendCourseSlice.reducer;