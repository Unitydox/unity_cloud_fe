import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    data: null,
    token: null, 
    plan: null
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload;  
    },
    setPlan: (state, action) => {
      state.plan = action.payload;
    }
  }
})

export const { setUserData, setToken, setPlan } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;