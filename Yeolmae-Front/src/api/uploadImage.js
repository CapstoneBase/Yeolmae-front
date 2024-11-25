import axios from 'axios';

const API = '/api/v1/graduation-project-posts';

export const uploadImage = async (formData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('로그인이 필요합니다.');
    }

    const response = await axios.post(API, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    // response.data.data가 S3 URL을 포함하고 있어야 함
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        throw new Error('인증이 만료되었습니다.');
      } else if (status === 413) {
        throw new Error('파일 크기가 너무 큽니다.');
      }
    }
    console.error('이미지 업로드 에러:', error);
    throw error;
  }
};
