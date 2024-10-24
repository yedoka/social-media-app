import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./slices/profileSlice";
import postSlice from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    post: postSlice.reducer,
  }
})