import store from '../redux/modules/store.js';
import createAxiosAuthInstance from './axiosAuthInstance';

export const loginUser = async (id, password) => {
  const API = '/login';
  const body = { id, password };
  const axiosAuthInstance = createAxiosAuthInstance(store);

  console.log('request body: ', body);
  try {
    console.log('loginUsers try');
    const response = await axiosAuthInstance.post(`${API}`, body);
    console.log(response);
    console.log(response.data);
    console.log(response.data.accessToken);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      window.alert('아이디 혹은 비밀번호 오류');
      console.log('Login Infor Error: ', error.message);
    } else if (error.response) {
      console.log('error : ', error.response);
      const { status, statusText, data } = error.response;
      console.log(`${status} - ${statusText} - ${data.message}`);
    } else if (error.request) {
      console.log('No response received: ', error.request);
    } else {
      console.log('Error setting up request: ', error.message);
    }
    throw error;
  }
};
