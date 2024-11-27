import axios from 'axios';

// uploadImage.js
export const uploadImage = async (formData, endpoint) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('로그인이 필요합니다.');
    }

    const response = await axios.post(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('이미지 업로드 상세 에러:', error.response?.data || error.message);

    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        throw new Error('인증이 만료되었습니다.');
      } else if (status === 413) {
        throw new Error('파일 크기가 너무 큽니다.');
      } else {
        throw new Error(data.message || '이미지 업로드에 실패했습니다.');
      }
    }

    throw error;
  }
};
