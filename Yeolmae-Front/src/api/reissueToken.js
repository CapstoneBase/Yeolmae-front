import axios from 'axios';
import { useEffect } from 'react';

const API = 'login';

export const reissueToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API}/reissue`, { refresh_token: refreshToken });
    return response.data;
  } catch (error) {
    console.log('error : ', error.response);
    const { status, statusText } = error.response;
    const message = error.response.data.message[0];
    console.log(`${status} - ${statusText} - ${message}`);
    throw error;
  }

  // const navigate = useNavigate();
  // useEffect(() => {
  //     const refresh = axios.create(
  //         '${API}/reissue',
  //     )
  // });

  // const interceptor = axios.interceptors.response.use(
  //     response => {
  //         return response;
  //     },
  //     async error => {
  //         if (error.reponse.status === 401) {
  //             console.log('토큰 재발급');
  //             await axios.post(`${API}/reissue`, {
  //                 headers: {
  //                     refreshToken: localStorage.getItem('refreshToken'),

  //                 }
  //             })
  //         }
  //     }
  // )
  // try {
  //     const response = await axios.post(`${API}/reissue`, {
  //         headers: {
  //             refreshToken: localStorage.getItem('refreshToken')
  //         }
  //     })
  // } catch (error) {
  //     throw error;
  // };
};
