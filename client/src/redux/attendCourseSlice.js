import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle:false,
    course:null,
    course_progress:[],
    active_progress:{session:1,content:1},
    video:{},
    content_type:'',
    video_progress:[],
    quiz_progress:[],
    assignment_progress:[],
    quizData:{},
    assignmentData:{},
    content:'',
    active:'',
    video_durations:{},
    progress_percentage:0,
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
        },
        updateQuizProgress:(state,action)=>{
            state.quiz_progress = action.payload;
        },
        updateAssignmentProgress:(state,action)=>{
            state.assignment_progress = action.payload;
        },
        updateQuizData:(state,action)=>{
            state.quizData = action.payload;
        },
        updateContent:(state,action)=>{
            state.content =  action.payload;
        },
        updateActive:(state,action)=>{
            state.active = action.payload;
        },
        updateAssignmentData:(state,action)=>{
            state.assignmentData = action.payload;
        },
        updateVideoDurations:(state,action)=>{
            state.video_durations = action.payload;
        },
        updateProgressPercentage:(state,action)=>{
            state.progress_percentage = action.payload;
        },
        resetStates:(state)=>initialState,
    
    }
})

export const {updateToggle,updateCourse,updateCourseProgress,updateActiveProgress,updateVideoPath
    ,updateContentTye,updateVideoProgress,updateAssignmentProgress,updateQuizProgress,updateQuizData,
    updateContent,updateActive,updateAssignmentData,updateVideoDurations,updateProgressPercentage,resetStates} = attendCourseSlice.actions;
export default attendCourseSlice.reducer;