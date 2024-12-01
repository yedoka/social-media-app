import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    unauthenticate: (state) => {
      state.isAuthenticated = false;
    }
  } 
})

export const { authenticate, unauthenticate } = authSlice.actions;
export default authSlice.reducer;