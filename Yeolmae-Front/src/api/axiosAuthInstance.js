/* eslint-disable no-param-reassign */
import axios from 'axios';
import { reissueTokenThunk } from '../redux/modules/reissueTokenThunk';

const createAxiosAuthInstance = (store) => {
  const axiosAuthInstance = axios.create({
    baseURL: 'api/v1/members',
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
      if (config.url === '/refreshAccessToken') {
        config.headers.Authorization = `Bearer ${refreshToken}`;
        console.log('refresh token 요청 : ', config.headers.Authorization);
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log(config.url);
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
    async (error) => {
      const { config, response } = error;
      if (response.status === 404) console.log('404 에러', ` ${response}`);
      console.log('axios use error');
      // const originRequest = error.config;
      console.log('config error');

      if (config.url === '/refreshAccessToken' && response.status === 401) {
        console.log('response 응답');
        try {
          const newAccessToken = await store.dispatch(reissueTokenThunk()); // await 추가
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosAuthInstance(config); // 재요청
        } catch (err) {
          return Promise.reject(err);
        }
      }

      console.log('reject');
      return Promise.reject(error);
    }
  );

  return axiosAuthInstance;
};

export default createAxiosAuthInstance;
