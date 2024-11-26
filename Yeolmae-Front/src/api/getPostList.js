import axios from 'axios';

const BASE_URL = 'api/v1';

// 에러 핸들링
const handleError = (error) => {
  if (error.response) {
    const { status, statusText, data } = error.response;
    console.log(`Error ${status} - ${statusText} - ${data.message}`);
    return { error: data.message, status };
  }
  if (error.request) {
    console.log('No response received:', error.request);
    return { error: 'No response received from server' };
  }
  console.log('Error setting up request:', error.message);
  return { error: 'Failed to setup request' };
};

const createQueryString = (params) => {
  if (!params) return '';
  // 값이 있는 파라미터만 필터링
  const validParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  // 파라미터가 없으면 빈 문자열 반환
  if (Object.keys(validParams).length === 0) return '';

  return new URLSearchParams(validParams).toString();
};

// API 요청 생성
const createApiRequest = async (endpoint, params = {}, options = {}) => {
  try {
    const queryString = createQueryString(params);
    const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;

    console.log('Request endpoint:', endpoint);
    console.log('Request URL:', url);
    console.log('Request params:', params);
    console.log('Request options:', options);

    const response = await axios({
      url,
      method: options.method || 'GET',
      ...options
    });

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default createApiRequest;

export const endpoints = {
  GRADUATION: '/graduation-project-posts',
  OTHER: '/other-project-posts',
  CONTEST: '/contest-posts'
};
