/* eslint-disable no-param-reassign */
import axios from 'axios';
import { reissueTokenThunk } from '../redux/modules/reissueTokenThunk';

const axiosAuthInstance = axios.create({
  baseURL: 'api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosAuthInstance.interceptors.request.use(
  async (config) => {
    // 로컬 스토리지에서 토큰을 get
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    // 토큰 재발급이 필요한 경우
    if (config.url === '/api/v1/login/reissue') {
      config.headers.Authorization = `Bearer ${refreshToken}`;
      console.log('refresh token 요청 : ', config.headers.Authorization);
    // 토큰 재발급이 필요하지 않은 경우
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('access token 요청 : ', config.headers.Authorization);
    }
    return config;
  },
  (error) => {
    console.log('request error: ', error);
    return Promise.reject(error);
  }
);

axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { config, response } = error;
    if (response.status === 404) console.log('404 에러', ` ${response}`);
    console.log('axios use error');
    // const originRequest = error.config;
    console.log('config error');
    if (config.url === '/api/v1/login/reissue' && response.status === 401) {
      console.log('response 응답');
      const newAccessToken = reissueTokenThunk();
      config.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosAuthInstance(config);
    }
    console.log('reject');
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
