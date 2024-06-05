import axios from 'axios';
import store from '../redux/modules/store';
import { SET_TOKEN, DELETE_TOKEN } from '../redux/modules/authSlice';
import reissueToken from './reissueToken';

const axiosInstance = axios.create({
  baseURL: 'api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (response) => {
    return response;
  },
  async (config) => {
    const state = store.getState();
    const { accessToken, refreshToken: currentRefreshToken } = state.auth;

    if (isTokenExpired(accessToken)) {
      try {
        const data = await refreshToken(currentRefreshToken);
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        store.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
      } catch (error) {
        store.dispatch(clearTokens());
        console.error('Token refresh failed', error);
        throw error;
      }
    } else {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
