import { loginUser } from '../../api/loginUser';
import { SET_TOKEN, SET_ERROR, DELETE_TOKEN } from './authSlice';

export const loginThunk = (id, password) => async (dispatch) => {
  try {
    const data = await loginUser(id, password);
    // dispatch(SET_USER(data.user));
    dispatch(SET_TOKEN({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
    console.log('SET_TOKEN dispatch');
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    console.log('토큰 저장');
    console.log('로컬 스토리지에 저장된 refresh Token: ', data.refreshToken);
  } catch (error) {
    dispatch(SET_ERROR(error.message));
    dispatch(DELETE_TOKEN());
    console.log('로그인 api 컴포넌트 에러');
  }
};
