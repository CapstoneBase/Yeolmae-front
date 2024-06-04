import { configureStore } from '@reduxjs/toolkit';
import userLogin from './userLogin';
import tokenReducer from './authSlice';

export default configureStore({
  reducer: {
    authToken: tokenReducer
  }
});
