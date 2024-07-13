import React, { ReactChild, useRef, useState, useEffect, Suspense, lazy, memo } from 'react';
import { useNavigate, useParams, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
// import axios from '../hooks/useAxios';
// import Categories from '../../Common/Categories';
import Button from '../../Common/Button';
import PostDetail from './PostDetail';
import './viewPostStyle.css';

function ViewPost() {
  const { id } = useParams(); // /board/:id와 동일한 변수명으로 데이터를 꺼낼 수 있다
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const getBoard = async () => {
    const response = await (await axios.get(`//13.124.45.191:8080/api/v1/posts/${id}`)).data;
    setBoard(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getBoard();
  }, []);

  /* axios
    .get('/api/v1/posts')
    .then((res) => {
      console.log(res.data);
      // console.log(res);
      if (res.status === 200) {
        console.log('게시글 불러오기 성공');
        navigate('/{postId}');
      }
      const body = {
        id: res.id,
        writerName: res.writerName,
        category: res.category,
        parentCategory: res.parentCategory,
        title: res.title,
        content: res.content,
        imageUrl: res.imageUrl,
        files: res.files,
        comments: res.comments,
        createdAt: res.createdAt
      };
    })
    .catch((err) => {
      console.error(err.response);
      if (err.response.status === 403) {
        alert('게시글 업로드에 실패하였습니다.');
      }
    }); */

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <PostDetail
          id={board.id}
          writerName={board.writerName}
          category={board.category}
          parentCategory={board.parentCategory}
          title={board.title}
          content={board.content}
          imageUrl={board.imageUrl}
          files={board.files}
          comments={board.comments}
          createdAt={board.createdAt}
        />
      )}
    </div>
  );
}
export default ViewPost;
