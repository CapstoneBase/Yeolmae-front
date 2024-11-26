import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../Common/Button';
import './viewPostStyle.css';

function ContPostDetail({
  id,
  authorName,
  title,
  mainCategory,
  description,
  content,
  hostingOrganization,
  sponsorOrganization,
  relatedWebsite,
  startDate,
  endDate,
  fileUrls,
  createdAt
}) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken'); // 로그인한 사용자의 액세스 토큰을 로컬저장소에서 가져오기

  const movetoPostList = () => {
    navigate('/contPostListPage');
  };

  const updatePost = () => {
    navigate(`/update/${id}`);
  };

  const deletePost = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`/api/v1/contest-posts`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          data: { postId: id }
        });
        if (Response.status === 200) {
          alert('삭제되었습니다.');
          navigate('/contPostListPage');
        } else {
          alert('삭제 실패하였습니다.');
        }
      } catch (error) {
        console.error('게시글 삭제 중 오류가 발생하였습니다:', err);
        alert('게시글 삭제 중 오류가 발생하였습니다.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="CategoryLinkContainer mb-3">
        <Link to="/posts/parentCategory">{mainCategory}</Link>
      </div>
      <h2 className="ReadBoardTitle mb-3">{title}</h2>
      <h5 className="ReadBoardDetails mb-3">{startDate}</h5>
      <h5 className="ReadBoardDetails mb-3">{endDate}</h5>
      <h5 className="ReadBoardDetails mb-3">{authorName}</h5>
      <h5 className="ReadBoardDetails mb-3">{createdAt}</h5>
      <hr />
      <div className="ReadBoardDetails mb-3">{description}</div>
      <div className="ReadBoardContent mb-3">{content}</div>
      <Button onClick={movetoPostList} text="목록으로 돌아가기" />
      {accessToken && ( // 액세스 토큰이 있는 경우에만 버튼 표시
        <div className="editingButtonsContainer mt-3">
          <Button onClick={updatePost} text="수정하기" />
          <Button onClick={deletePost} text="삭제하기" />
        </div>
      )}
    </div>
  );
}

export default ContPostDetail;
