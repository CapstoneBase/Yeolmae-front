import axios from 'axios';

const apiUrlMap = {
  grad: {
    create: '/api/v1/graduation-project-posts',
    createComment: '/api/v1/graduation-project-posts/comments',
    fetch: (postId) => `/api/v1/graduation-project-posts/${postId}`,
    fetchComments: (postId) => `/api/v1/graduation-project-posts/comments/${postId}`,
    update: '/api/v1/graduation-project-posts',
    fetchAll: '/api/v1/graduation-project-posts',
    delete: '/api/v1/graduation-project-posts'
  },
  cont: {
    create: '/api/v1/contest-posts',
    createComment: '/api/v1/contest-posts/comments',
    fetch: (postId) => `/api/v1/contest-posts/${postId}`,
    fetchComments: (postId) => `/api/v1/contest-posts/comments/${postId}`,
    update: '/api/v1/contest-posts',
    fetchAll: '/api/v1/contest-posts',
    delete: '/api/v1/contest-posts'
  },
  other: {
    create: '/api/v1/other-project-posts',
    createComment: '/api/v1/other-project-posts/comments',
    fetch: (postId) => `/api/v1/other-project-posts/${postId}`,
    fetchComments: (postId) => `/api/v1/other-project-posts/comments/${postId}`,
    update: '/api/v1/other-project-posts',
    fetchAll: '/api/v1/other-project-posts',
    delete: '/api/v1/other-project-posts'
  }
};

const createPost = (type, queryParams, formData) => {
  return axios.post(`${apiUrlMap[type].create}?${queryParams}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
};
const createComment = (type, data) => axios.post(apiUrlMap[type].createComment, data);
const fetchPost = (type, postId) => axios.get(apiUrlMap[type].fetch(postId));
const fetchComments = (type, postId) => axios.get(apiUrlMap[type].fetchComments(postId));
const updatePost = (type, postId, data) => axios.put(apiUrlMap[type].update, { postId, ...data });
const fetchAllPosts = (type) => axios.get(apiUrlMap[type].fetchAll);
const deletePost = (type, postId) =>
  axios.delete(apiUrlMap[type].delete, {
    data: { postId }
  });

export {
  createPost,
  createComment,
  fetchPost,
  fetchComments,
  updatePost,
  fetchAllPosts,
  deletePost,
  apiUrlMap
};
