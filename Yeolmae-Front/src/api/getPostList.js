import axios from 'axios';
import { useEffect } from 'react';

export const getPostList = async (parCategory, category, page, size) => {
  const API = `api/v1/posts?&parentCategory=${parCategory}&category=${catergory}&page=${page}&size=${size}`;
  // const API = 'api/v1/posts?&page=0&size=12';
  const body = { parCategory, category, page, size };
  console.log('request body: ', body);
  try {
    const postList = await axios.get(API);
    // console.log(postList.data.data.items);
    return postList.data.data;
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
