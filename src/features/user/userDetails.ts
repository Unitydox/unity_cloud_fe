import { createSlice } from '@reduxjs/toolkit';

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    data: null
  },
  reducers: {
    userData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { userData } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;