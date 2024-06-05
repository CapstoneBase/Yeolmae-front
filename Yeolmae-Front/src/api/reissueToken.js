import axios from 'axios';

const API = '/api/v1/login';

export const reissueToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${API}/reissue`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('error : ', error.response);
    const { status, statusText, data } = error.response;
    console.log(`${status} - ${statusText} - ${data.message}`);
    throw error;
  }
};
