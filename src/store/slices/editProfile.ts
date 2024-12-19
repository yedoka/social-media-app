import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false
}

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    enable: (state) => {
      state.isEditing = true
    },
    disable: (state) => {
      state.isEditing = false
    }
  }
})

export const { enable, disable } = editProfileSlice.actions;
export default editProfileSlice.reducer;