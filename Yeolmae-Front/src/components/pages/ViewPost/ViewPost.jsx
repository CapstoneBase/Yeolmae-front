import React, { ReactChild, useRef, useState, Suspense, lazy, memo } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import axios from 'axios';
// import axios from '../hooks/useAxios';
// import Categories from '../../Common/Categories';
import Button from '../../Common/Button';
import './viewPostStyle.css';

function ViewPost() {
  const navigate = useNavigate();

  axios
    .get('/api/v1/posts')
    .then((res) => {
      console.log(res.data);
      // console.log(res);
      if (res.status === 200) {
        console.log('게시글 불러오기 성공');
        navigate('/{postId}');
      }
      const body = {
        category: res.category,
        parentCategory: res.parentCategory,
        title: res.title,
        content: res.content,
        imageUrl: res.imageUrl
      };
    })
    .catch((err) => {
      console.error(err.response);
      if (err.response.status === 403) {
        alert('게시글 업로드에 실패하였습니다.');
      }
    });

  return (
    <div className="Wrapper">
      <div className="CategoryLinkContainer">
        <Link to="/posts">parentCategory</Link>
        <Link to="/posts">Category</Link>
      </div>
      <div className="ReadBoardTitle" id="title" name="title" type="text" />
      <div className="ReadBoardContentBox" id="content" name="content" type="text" />
      <div className="UploadFile">
        <div type="file" text="파일 보기" />
      </div>
      <Button text="목록으로 돌아가기">
        <Link to="/posts" />
      </Button>
      <div className="editingButtonsBox">
        <Button text="수정하기">
          <Link to="/posts" />
        </Button>
        <Button text="삭제하기">
          <Link to="/posts" />
        </Button>
      </div>
    </div>
  );
}
export default ViewPost;
