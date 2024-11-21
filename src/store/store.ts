import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice"; 

export const store = configureStore({
  reducer: {
    profile: profileReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
