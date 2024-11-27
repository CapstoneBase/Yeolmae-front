import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../Common/Button';
import '../../../../scss/viewPostStyle.scss';

function ContPostDetail({
  id,
  authorName,
  title,
  mainCategory,
  description,
  content,
  hostingOrganization,
  sponsoringOrganization,
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
        if (response.status === 200) {
          alert('삭제되었습니다.');
          navigate('/contPostListPage');
        } else {
          alert('삭제 실패하였습니다.');
        }
      } catch (error) {
        console.error('게시글 삭제 중 오류가 발생하였습니다:', error);
        alert('게시글 삭제 중 오류가 발생하였습니다.');
      }
    }
  };

  return (
    <div className="board-detail-container container mt-5">
      {/* 게시글 유형 */}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/contPostlistPage" className="listpage-link">
            대회 및 공모전
          </Link>
        </div>
      </div>

      {/* Main Category */}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/contPostlistPage/parentCategory" className="category-link">
            {mainCategory || '카테고리 없음'}
          </Link>
        </div>
      </div>

      {/* Title */}
      <h2 className="board-title">{title || '제목 없음'}</h2>

      {/* Author and Date */}
      <div className="row mb-3 board-details">
        <div className="col-6">
          <span className="board-details-label">작성자:</span> {authorName || '없음'}
        </div>
        <div className="col-6">
          <span className="board-details-label">작성일:</span> {createdAt || '없음'}
        </div>
      </div>

      {/* Event Period */}
      <div className="row mb-3 board-details">
        <div className="col-6">
          <span className="board-details-label">대회 기간:</span> {startDate || '없음'} ~{' '}
          {endDate || '없음'}
        </div>
      </div>

      {/* Hosting and Sponsor Organizations */}
      <div className="row mb-3 board-details">
        <div className="col-6">
          <span className="board-details-label">주최기관:</span> {hostingOrganization || '없음'}
        </div>
        <div className="col-6">
          <span className="board-details-label">주관기관:</span> {sponsoringOrganization || '없음'}
        </div>
      </div>

      {/* Related Website */}
      <div className="row mb-3 board-details">
        <div className="col-12">
          <span className="board-details-label">관련 페이지:</span>{' '}
          {relatedWebsite ? (
            <a href={relatedWebsite} target="_blank" rel="noopener noreferrer">
              {relatedWebsite}
            </a>
          ) : (
            '없음'
          )}
        </div>
      </div>

      <hr />

      {/* Description */}
      <div className="board-content">
        <div className="board-content-description">{description || '설명 없음'}</div>
        <div className="board-content-text">{content || '내용 없음'}</div>
      </div>

      {/* Attached Files */}
      {fileUrls && fileUrls.length > 0 && (
        <div className="row mb-3 board-details">
          <div className="col-12">
            <span className="board-details-label">첨부 파일:</span>
            {fileUrls.map((file, index) => (
              <div key={index}>
                <a href={file} target="_blank" rel="noopener noreferrer">
                  파일 {index + 1}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr />

      {/* Comment Section */}
      <div className="comments-section">
        <h5>댓글</h5>
        {/* 댓글 데이터가 있을 경우 보여주는 영역 */}
        <div>
          {/* 여기에 댓글 데이터를 순회하며 표시 */}
          {/* 예: */}
          <p>댓글 1 내용</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="row mt-3">
        {accessToken && (
          <div className="col-6 text-end">
            <Button onClick={updatePost} text="수정하기" />
            <Button onClick={deletePost} text="삭제하기" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ContPostDetail;
