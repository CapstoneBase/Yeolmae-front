/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../api/loginUsers';
import { reissueToken } from '../../api/reissueToken';

export const authSlice = createSlice({
  name: 'auth',
  // 초기 상태(인가 여부, access token, refresh token, error)
  initialState: {
    // user: null,
    authenticated: false,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    error: null
  },
  // 리듀서
  reducers: {
    // SET_USER: (state, action) => {
    //   state.user = action.payload;
    // },
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    DELETE_TOKEN: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
    }
  }
});

// 액션 타입
export const { SET_TOKEN, DELETE_TOKEN, SET_ERROR } = authSlice.actions;

export const loginThunk = (id, password) => async (dispatch) => {
  try {
    const data = await loginUser(id, password);
    // dispatch(SET_USER(data.user));
    dispatch(SET_TOKEN({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
    console.log('SET_TOKEN dispatch');
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    console.log('토큰 저장');
    console.log(data.refreshToken);
  } catch (error) {
    dispatch(SET_ERROR(error.message));
  }
};

// reissue thunk 함수
export const reissueTokenThunk = () => async (dispatch, getState) => {
  const state = getState();
  const { refreshToken } = state.auth;

  try {
    // reissueTokenAPI 함수로 서버에 토큰 재발급 요청
    const data = await reissueToken(refreshToken);
    // SET_TOKEN 액션 디스패치, 리덕스 상태 업데이트
    console.log('reissue API req');
    dispatch(
      SET_TOKEN({ accessToken: data.data.accessToken, refreshToken: data.data.refreshToken })
    );
    // 토큰 재발급 성공 후 새로운 토큰 로컬에 저장
    console.log('SET_TOKEN dispatch');
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    console.log('토큰 저장');
    console.log('새 refreshToken: ', data.refreshToken);
  } catch (error) {
    // 토큰 재발급 실패
    console.error('토큰 재발급 실패', error);
    dispatch(SET_ERROR(error.message));
    // DELETE_TOKEN 액션 디스패치해 인증상태 초기화
    dispatch(DELETE_TOKEN());
  }
};

export default authSlice.reducer;
