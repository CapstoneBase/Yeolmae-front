import axios from 'axios';

const API = '/api/vi/login';

export const loginUser = async (id, password) => {
  const body = { id, password };
  try {
    const response = await axios.post(`${API}/login`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('error : ', error.response);
    const { status, statusText } = error.response;
    const message = error.response.data.message[0];
    console.log(`${status} - ${statusText} - ${message}`);
    throw error;
  }
};
