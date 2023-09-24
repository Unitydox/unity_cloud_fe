import { createSlice } from '@reduxjs/toolkit';

export const imageSearchSlice = createSlice({
  name: 'imageSearch',
  initialState: {
    search_text: ''
  },
  reducers: {
    updateSearchText: (state, action) => {
      state.search_text = action.payload
    }
  }
})

export const { updateSearchText } = imageSearchSlice.actions;

export default imageSearchSlice.reducer;