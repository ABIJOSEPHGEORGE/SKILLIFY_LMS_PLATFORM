import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories:[],
    subcategories:[],
    subcategory:{},
    error:null,
}

export const allCategories = createAsyncThunk('category/allCategory', async () => {
    try {
      const response = await axios.get('/admin/categories');
      return response.data.results.categories;
    } catch (error) {
      throw error;
    }
  });

export const fetchSubcategories = createAsyncThunk('/category/allSubcategory',async ()=>{
    try{
        const response = await axios.get('/admin/subcategories');
        return response.data.results.subcategories;
    }catch(err){
        throw err;
    }
})

// export const fetchSubCategory = createAsyncThunk('/category/Subcategory',async (subId,parId)=>{
//     try{
//         const response = await axios.get(`/admin/subcategory/${parId}/${subId}`);
//         return response.data.results.subcategories;
//     }catch(err){
//         throw err;
//     }
// })

const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
        editSubcategory:(state,action)=>{
            state.subcategory = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(allCategories.pending,(state)=>{
            state.categories = [];
            state.error = null;
        })
        .addCase(allCategories.fulfilled,(state,action)=>{
            state.categories = action.payload;
            state.error = null;
        })
        .addCase(allCategories.rejected,(state,action)=>{
            state.categories = [];
            state.error = action.payload;
        })
        //subcategory
        builder.addCase(fetchSubcategories.pending,(state,action)=>{
            state.subcategories = [];
            state.error = null;
        })
        .addCase(fetchSubcategories.fulfilled,(state,action)=>{
            state.subcategories = action.payload;
            state.error = null;
        })
        .addCase(fetchSubcategories.rejected,(state,action)=>{
            state.subcategories = [];
            state.error = action.payload;
        })
        //single sub category
        // builder.addCase(fetchSubCategory.pending,(state,action)=>{
        //     state.subcategory = {};
        //     state.error = null;
        // })
        // .addCase(fetchSubCategory.fulfilled,(state,action)=>{
        //     state.subcategory = action.payload;
        //     state.error = null;
        // })
        // .addCase(fetchSubCategory,(state,action)=>{
        //     state.subcategory = {};
        //     state.error = action.payload;
        // })
    }
})

export const {editSubcategory} = categorySlice.actions;
export default categorySlice.reducer;
