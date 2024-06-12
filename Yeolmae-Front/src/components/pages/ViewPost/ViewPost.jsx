import React, { ReactChild, useRef, useState, useEffect, Suspense, lazy, memo } from 'react';
import { useNavigate, useParams, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
// import axios from '../hooks/useAxios';
// import Categories from '../../Common/Categories';
import Button from '../../Common/Button';
import PostDetail from './PostDetail';
import './viewPostStyle.css';

function ViewPost() {
  const { idx } = useParams(); // /board/:idx와 동일한 변수명으로 데이터를 꺼낼 수 있습니다.
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});
  const getBoard = async () => {
    const resp = await (await axios.get(`//localhost:8080/board/${idx}`)).data;
    setBoard(resp.data);
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
          idx={board.idx}
          title={board.title}
          contents={board.contents}
          createdBy={board.createdBy}
        />
      )}
    </div>
  );
}
export default ViewPost;
