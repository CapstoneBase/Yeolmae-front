import axios from 'axios';
// import axiosAuthInstance from './axiosInstance';

export const loginUser = async (id, password) => {
  const API = '/api/v1/login';
  const body = { id, password };

  console.log('request body: ', body);
  try {
    console.log('loginUsers try');
    const response = await axios.post(`${API}`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
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
