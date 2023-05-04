import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:'profile',
    initialState:{
        profile_image:null,
    },
    reducers:({
        updateProfileImage:(state,action)=>{
            state.profile_image = action.payload;
        }
    })
})

export const {updateProfileImage} = profileSlice.actions
export default profileSlice.reducer