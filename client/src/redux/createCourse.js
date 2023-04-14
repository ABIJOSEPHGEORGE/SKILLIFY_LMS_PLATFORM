import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
        curriculum:[],
        course_price:'',
        course_sale_price:'',
        course_welcome_message:'',
        course_completion_message:'',
    },
    section:{title:'',description:'',content:[]},
    lecture:{title:'',description:'',video_path:'',video_name:''},
    assignment:{title:'',description:'',file_path:'',file_name:''},
    quiz:{title:'',description:'',questions:[]},
    questions:{question:'',options:[]},
    //{answer:'',isCorrect:false}
}

const createCourseSlice = createSlice({
    name:'createCourse',
    initialState,
    reducers:{

        updateFormData:(state,action)=>{
            state.formData = action.payload;
        },
        updateLecture:(state,action)=>{
            state.lecture = action.payload;
        },
        updateAssignment:(state,action)=>{
            state.assignment = action.payload;
        },
        createSection:(state,action)=>{
            state.formData.curriculum.push(
                action.payload
            )
        },
        updateSection:(state,action)=>{
           state.section = action.payload;
        },
        deleteSection:(state,action)=>{
            state.formData.curriculum.splice(action.payload,1)
        },
        createContent:(state,action)=>{
            state.formData.curriculum[action.payload.index].content.push(
                action.payload.content
            )
        },
        createQuiz:(state,action)=>{
            state.quiz = action.payload;
        },
        createQuestion:(state,action)=>{
            state.quiz.questions.push(
                action.payload
            )
        },
        createNewQuestion:(state,{payload})=>{
            state.formData.curriculum[payload.sec_index]
            .content[payload.con_index]
            .questions.push(payload.question);
        },

        createSingleQuestion:(state,action)=>{
            state.questions = action.payload;
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
    updateLecture,
    createSection,
    createContent,
    updateAssignment,
    createQuestion,
    createQuiz,
    createNewQuestion,
    } = createCourseSlice.actions;
export default createCourseSlice.reducer;