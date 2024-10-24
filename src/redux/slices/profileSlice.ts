import {createSlice} from "@reduxjs/toolkit";

interface ProfileState {
  isAuthenticated: boolean;
  token: string | null;
  userDetails: {
    username: string;
    email: string;
  } | null;
}

const initialState: ProfileState = {
  isAuthenticated: false,
  token: null,
  userDetails: null,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userDetails = null;
    }
  }
})

export default profileSlice;