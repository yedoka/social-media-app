import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userDetails } from "../../types/userDetails";

interface ProfileState {
  isAuthenticated: boolean;
  token: string | null;
  userDetails: userDetails | null;
}

const initialState: ProfileState = {
  isAuthenticated: false,
  token: null,
  userDetails: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<{ token: string; userDetails: userDetails }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userDetails = null;
    },
  },
});

export const { logIn, logOut } = profileSlice.actions;

export default profileSlice.reducer;
