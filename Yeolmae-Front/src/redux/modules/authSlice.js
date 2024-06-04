/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600 * 1000;

export const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    expireTime: null
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.expireTime = null;
    }
  }
});

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;

export default authSlice.reducer;
