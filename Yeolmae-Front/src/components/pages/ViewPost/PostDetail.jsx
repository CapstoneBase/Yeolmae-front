import React, { ReactChild, useRef, useState, useEffect, Suspense, lazy, memo } from 'react';
import { useNavigate, useParams, Routes, Route, Link } from 'react-router-dom';
import Button from '../../Common/Button';
import './viewPostStyle.css';

function PostDetail({
  id,
  writerName,
  category,
  parentCategory,
  title,
  content,
  imageUrl,
  files,
  comments,
  createdAt
}) {
  return (
    <div className="Wrapper">
      <div className="CategoryLinkContainer">
        <Link to="/posts/parentCategory">{parentCategory}</Link>
        <Link to="/posts/parentCategory/category">{category}</Link>
      </div>
      <h2 className="ReadBoardTitle">{title}</h2>
      <h5 className="ReadBoardTitle">{writerName}</h5>
      <h5 className="ReadBoardTitle">{createdAt}</h5>
      <hr />
      <div className="ReadBoardContentBox" id="content" name="content" type="text" />
      <div className="ReadFile">
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

export default PostDetail;
