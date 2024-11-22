import axios from 'axios';

const API = '/api/v1/members';

export const reissueToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${API}/refreshAccessToken`,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` }
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log('error : ', error.response);
    const { status, statusText, data } = error.response;
    console.log(`${status} - ${statusText} - ${data.message}`);
    throw error;
  }
};
