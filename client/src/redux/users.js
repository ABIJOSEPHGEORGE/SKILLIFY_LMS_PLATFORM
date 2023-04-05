import { createSlice} from '@reduxjs/toolkit';

const users = createSlice({
  name: 'users',
  initialState:{isInstructor:false },
  reducers: {
    updateUserRole:(state,action)=>{
        state.isInstructor = action.payload;
    }
  },
 
});

export const {updateUserRole}  = users.actions;
export default users.reducer;