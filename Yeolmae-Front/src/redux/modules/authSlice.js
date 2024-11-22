/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  // 초기 상태(인가 여부, access token, refresh token, error)
  initialState: {
    authenticated: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    error: null
  },
  // 리듀서
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    DELETE_TOKEN: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.authenticated = false;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    }
  }
});

// 액션 타입
export const { SET_TOKEN, DELETE_TOKEN, SET_ERROR } = authSlice.actions;

export default authSlice.reducer;
