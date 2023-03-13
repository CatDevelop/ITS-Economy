import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import profileReducer from './slices/profileSlice';
import transferReducer from './slices/transferSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    transfer: transferReducer
  },
});
