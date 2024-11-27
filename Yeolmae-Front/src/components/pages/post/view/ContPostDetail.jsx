import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill'; // ReactQuill import
import 'react-quill/dist/quill.snow.css';
import { DeltaToHtmlConverter } from 'quill-delta-to-html';
import Button from '../../../Common/Button';
import '../../../../scss/viewPostStyle.scss';

// Delta를 HTML로 변환하는 함수
const convertDeltaToHtml = (delta) => {
  try {
    if (!delta || !Array.isArray(delta.ops)) {
      console.error('유효하지 않은 Delta 데이터입니다:', delta);
      return '<p>내용 없음</p>';
    }

    const converter = new DeltaToHtmlConverter(delta.ops, {
      inlineStyles: true
    });
    return converter.convert();
  } catch (error) {
    console.error('Delta 변환 오류:', error);
    return '<p>내용 변환 중 오류 발생</p>';
  }
};

function ContPostDetail({
  id,
  authorName,
  title,
  mainCategory,
  description,
  thumbnail,
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
  const accessToken = localStorage.getItem('accessToken'); // 로그인한 사용자의 액세스 토큰

  // 게시글 삭제 처리
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

  // 게시글 수정 화면 이동
  const updatePost = () => {
    navigate(`/update/${id}`);
  };

  // 게시글 내용 렌더링
  const renderContent = () => {
    if (!content) return '내용 없음';

    // Delta 형식 확인
    if (content.ops) {
      const htmlContent = convertDeltaToHtml(content);
      return <div className="ql-editor" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }

    // HTML 또는 일반 텍스트로 처리
    return <div>{content}</div>;
  };

  return (
    <div className="board-detail-container container mt-5">
      {/* 게시글 유형 */}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/contPostListPage" className="listpage-link">
            대회 및 공모전
          </Link>
        </div>
      </div>

      {/* Main Category */}
      <div className="row mb-3">
        <div className="col-12">
          <Link to="/contPostListPage/parentCategory" className="category-link">
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
      <div className="board-content-description">{description || '설명 없음'}</div>

      {/* Thumbnail Image */}
      {thumbnail && (
        <div className="board-thumbnail-container">
          <img
            src={thumbnail}
            alt="게시글 썸네일"
            className="img-fluid mb-3"
            style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="board-content">{renderContent()}</div>

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

      {/* Buttons */}
      {accessToken && (
        <div className="row mt-3">
          <div className="col-6 text-end">
            <Button onClick={updatePost} text="수정하기" />
            <Button onClick={deletePost} text="삭제하기" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ContPostDetail;
