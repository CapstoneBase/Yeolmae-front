import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
  const navigate = useNavigate();

  const movetoPostList = () => {
    navigate('/board');
  };

  const updatePost = () => {
    navigate('/board');
  };

  const deletePost = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      await axios.delete(`//localhost:8080/posts/${id}`).then((res) => {
        alert('삭제되었습니다.');
        navigate('/posts');
      });
    }
  };

  return (
    <div className="Wrapper">
      <div className="CategoryLinkContainer">
        <Link to="/posts/parentCategory">{parentCategory}</Link>
        <p>{'>'}</p>
        <Link to="/posts/parentCategory/category">{category}</Link>
      </div>
      <h2 className="ReadBoardTitle">{title}</h2>
      <h5 className="ReadBoardDetails">{writerName}</h5>
      <h5 className="ReadBoardDetails">{createdAt}</h5>
      <hr />
      <div className="ReadBoardContent">{content}</div>
      <div className="ReadBoardThumbnail">
        <img src={imageUrl} alt="썸네일" />
      </div>
      <Button onClick={movetoPostList} text="목록으로 돌아가기" />
      <div className="editingButtonsContainer">
        <Button onClick={updatePost} text="수정하기" />
        <Button onClick={deletePost} text="삭제하기" />
      </div>
    </div>
  );
}

export default PostDetail;
