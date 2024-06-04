import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';
import { authSlice } from './authSlice';

const store = configureStore({
  reducer: {
    user: usersSlice,
    authToken: authSlice
  }
});

export default store;
