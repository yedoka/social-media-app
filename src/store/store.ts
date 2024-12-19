import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/Auth';
import editProfileReducer from './slices/EditProfile';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    editProfile: editProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
