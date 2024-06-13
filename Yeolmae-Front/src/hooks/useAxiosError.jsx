import { useState } from 'react';

const useAxiosError = () => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    if (error.response) {
      console.error('Error response:', error.response);
      const { status, statusText, data } = error.response;
      console.error(`${status} - ${statusText} - ${data?.message}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    setError(error);
    throw error;
  };

  return { error, handleError };
};

export default useAxiosError;
