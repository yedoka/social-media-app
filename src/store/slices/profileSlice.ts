import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userDetails } from "../../types/userDetails";

interface ProfileState {
  token: string | null;
  userDetails: userDetails | null;
}

const initialState: ProfileState = {
  token: null,
  userDetails: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logIn(state, action: PayloadAction<{ token: string; userDetails: userDetails }>) {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logOut(state) {
      state.token = null;
      state.userDetails = null;
    },
    updateProfile(state, action: PayloadAction<userDetails>) {
      if (state.userDetails) {
        state.userDetails = { ...state.userDetails, ...action.payload };
      }
    },
  },
});

export const { logIn, logOut, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
