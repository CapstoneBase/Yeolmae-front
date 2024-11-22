import { reissueToken } from '../../api/reissueToken';
import { SET_TOKEN, SET_ERROR, DELETE_TOKEN } from './authSlice';

export const reissueTokenThunk = () => async (dispatch, getState) => {
  const state = getState();
  const { refreshToken } = state.auth;

  try {
    console.log('토큰 재발급 시작');
    // reissueTokenAPI 함수로 서버에 토큰 재발급 요청
    const tkData = await reissueToken(refreshToken);
    // SET_TOKEN 액션 디스패치, 리덕스 상태 업데이트
    console.log('서버 응답:', tkData);
    console.log('tkData.data:', tkData.data);
    dispatch(
      SET_TOKEN({ accessToken: tkData.data.accessToken, refreshToken: tkData.data.refreshToken })
    );
    // 토큰 재발급 성공 후 새로운 토큰 로컬에 저장
    console.log('SET_TOKEN dispatch');
    localStorage.setItem('accessToken', tkData.data.accessToken);
    localStorage.setItem('refreshToken', tkData.data.refreshToken);
    console.log('토큰 저장');
    console.log('새 refreshToken: ', tkData.data.refreshToken);

    return tkData.data.accessToken;
  } catch (error) {
    // 토큰 재발급 실패
    console.error('토큰 재발급 실패 상세:', error);
    console.error('에러 응답:', error.response);
    dispatch(SET_ERROR(error.message));
    // DELETE_TOKEN 액션 디스패치해 인증상태 초기화
    dispatch(DELETE_TOKEN());
    throw error;
  }
};
