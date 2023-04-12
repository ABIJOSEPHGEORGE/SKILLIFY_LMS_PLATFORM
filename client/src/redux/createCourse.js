import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    totalSection : 0,
    section:[],
    course_image:'',
    promo_video:'',
    section_content:{title:'',description:'',content_type:'',video:'',content_title:'',content_description:'',id:''}
}

const createCourseSlice = createSlice({
    name:'createCourse',
    initialState,
    reducers:{
        updateTotalSection:(state,action)=>{
            state.totalSection++;
        },
        updateSection:(state,action)=>{
            state.section.push(
                action.payload
            )
        },
        deleteSection:(state,action)=>{
            state.section = action.payload;
        },
        updateCourseImage:(state,action)=>{
            state.course_image = action.payload;
        },
        updatePromotionalVideo:(state,action)=>{
            state.promo_video =action.payload;
        },
        resetState:(state)=>initialState,
        updateSectionContent:(state,action)=>{
            state.section_content = action.payload;
        }
    }
})

export const {
    updateTotalSection,
    updateSection,
    deleteSection,
    updateCourseImage,
    updateSectionContent,
    updatePromotionalVideo,
    resetState,
    } = createCourseSlice.actions;
export default createCourseSlice.reducer;