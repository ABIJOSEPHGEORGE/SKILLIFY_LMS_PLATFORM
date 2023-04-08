import { createSlice} from '@reduxjs/toolkit';

const admin = createSlice({
  name: 'admin',
  initialState:{
    error : '',
    categories:[],
    popup:null,
    singleCategory:{}
  },
  reducers: {
    updateError:(state,action)=>{
        state.error = action.payload;
    },
    updateCategory:(state,action)=>{
      state.categories = action.payload
    },
    togglePopup:(state,action)=>{
      state.popup = action.payload;
    },
    editCategory:(state,action)=>{
      state.singleCategory = action.payload;
    }
  },
 
});

export const {updateError,updateCategory,togglePopup,editCategory}  = admin.actions;
export default admin.reducer;