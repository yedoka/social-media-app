import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    }
  } 
})

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;