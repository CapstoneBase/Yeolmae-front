/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { reissueToken as reissueTokenAPI } from '../../api/reissueToken';

// 토큰 만료 시간
// export const TOKEN_TIME_OUT = 600 * 1000;

export const authSlice = createSlice({
  name: 'authToken',
  // 초기 상태(인가 여부, access token, refresh token)
  initialState: {
    authenticated: false,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
  },
  // 리듀서
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    }
  }
});

// 액션 타입
export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;

export default authSlice.reducer;

// reissue thunk 함수
export const reissueToken = () => async (dispatch, getState) => {
  const state = getState();
  const { refreshToken } = state.reissueToken;

  try {
    // reissueTokenAPI 함수로 서버에 토큰 재발급 요청
    const data = await reissueTokenAPI(refreshToken);
    // 토큰 재발급 성공 후 새로운 토큰 로컬에 저장
    const { accessToken, refreshToken: newRefreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    // SET_TOKEN 액션 디스패치, 리덕스 상태 업데이트
    localStorage.setItem('refreshToken', refreshToken);
    dispatch(SET_TOKEN({ accessToken, refreshToken: newRefreshToken }));
  } catch (error) {
    // 토큰 재발급 실패
    console.error('토큰 재발급 실패', error);
    // DELETE_TOKEN 액션 디스패치해 인증상태 초기화
    dispatch(DELETE_TOKEN());
  }
};
