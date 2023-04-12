import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    section:[],
    course_image:'',
    promo_video:'',
    section_title:'',
    section_description:'',

    formData:{
        course_title:'',
        course_subtitle:'',
        course_description:'',
        category:'',
        sub_category:'',
        course_image:'',
        promotional_video:'',
        curriculum:'',
        course_price:'',
        course_sale_price:'',
        course_welcome_message:'',
        course_completion_message:'',
    }
}

const createCourseSlice = createSlice({
    name:'createCourse',
    initialState,
    reducers:{

        updateFormData:(state,action)=>{
            state.formData = action.payload;
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
        updateSectionTitle:(state,action)=>{
            state.section_title = action.payload;
        },
        updateSectionDesc:(state,action)=>{
            state.section_description =action.payload;
        },
    }
})

export const {
    updateTotalSection,
    updateSection,
    deleteSection,
    updateCourseImage,
    updateSectionTitle,
    updateSectionDesc,
    updatePromotionalVideo,
    resetState,
    updateFormData,
    } = createCourseSlice.actions;
export default createCourseSlice.reducer;