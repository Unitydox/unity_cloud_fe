import { createSlice } from '@reduxjs/toolkit';

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState: {
    selected: null
  },
  reducers: {
    selectMenu: (state, action) => {
      state.selected = action.payload
    }
  }
})

export const { selectMenu } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;