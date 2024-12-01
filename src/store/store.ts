import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth';
import editProfileReducer from './slices/editProfile';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    editProfile: editProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
