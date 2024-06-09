import { reissueToken } from '../../api/reissueToken';
import { SET_TOKEN, SET_ERROR, DELETE_TOKEN } from './authSlice';

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