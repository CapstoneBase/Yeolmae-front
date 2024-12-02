import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchPost, fetchComments, createComment, deletePost } from '../../../api/index';
import '../../../scss/viewPostStyle.scss';

function ViewPost() {
  const navigate = useNavigate();
  const { type, id } = useParams(); // 'grad', 'cont', 'other'
  const accessToken = localStorage.getItem('accessToken');

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const POST_TYPE_TITLES = {
    grad: '졸업작품',
    cont: '대회 및 공모전',
    other: '개인 프로젝트'
  };

  const fetchPostData = async () => {
    try {
      const response = await fetchPost(type, id);
      setPost(response.data);
    } catch (error) {
      console.error('게시글 조회 실패:', error);
      alert('게시글을 불러오는데 실패했습니다.');
    }
  };

  const fetchCommentsData = async () => {
    try {
      const response = await fetchComments(type, id);
      setComments(response.data);
    } catch (error) {
      console.error('댓글 조회 실패:', error);
    }
  };

  useEffect(() => {
    fetchPostData();
    fetchCommentsData();
  }, [type, id]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await createComment(type, {
        postId: id,
        content: newComment
      });
      setNewComment('');
      fetchCommentsData();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      try {
        const response = await deletePost(type, id);
        if (response.status === 200) {
          alert('삭제되었습니다.');
          navigate(`/posts/${type}`);
        }
      } catch (error) {
        console.error('게시글 삭제 실패:', error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  // 게시글 유형별 추가 정보 렌더링
  const renderAdditionalInfo = () => {
    if (!post) return null;

    switch (type) {
      case 'grad':
        return (
          <>
            <Row className="mb-3">
              <Col md={6}>
                <span className="info-label">학교:</span> {post.school || '없음'}
              </Col>
              <Col md={6}>
                <span className="info-label">전공:</span> {post.department || '없음'}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <span className="info-label">프로젝트 목표 및 활용방안:</span>
                <p>{post.goalAndUtilization || '없음'}</p>
              </Col>
            </Row>
          </>
        );
      case 'cont':
        return (
          <>
            <Row className="mb-3">
              <Col md={6}>
                <span className="info-label">주최기관:</span> {post.hostingOrganization || '없음'}
              </Col>
              <Col md={6}>
                <span className="info-label">주관기관:</span>{' '}
                {post.sponsoringOrganization || '없음'}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12}>
                <span className="info-label">관련 페이지:</span>{' '}
                {post.relatedWebsite ? (
                  <a href={post.relatedWebsite} target="_blank" rel="noopener noreferrer">
                    {post.relatedWebsite}
                  </a>
                ) : (
                  '없음'
                )}
              </Col>
            </Row>
          </>
        );
      case 'other':
        return (
          <Row className="mb-3">
            <Col md={12}>
              <span className="info-label">프로젝트 목표 및 활용방안:</span>
              <p>{post.goalAndUtilization || '없음'}</p>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="board-detail-container">
      {/* 제목과 기본 정보 */}
      <div className="category-badge">{POST_TYPE_TITLES[type]}</div>

      <h1 className="board-title">{post.title}</h1>

      <div className="board-info">
        <span>작성자: {post.authorName}</span>
        <span className="info-divider">|</span>
        <span>작성일: {post.createdAt}</span>
      </div>

      {/* 대회/프로젝트 기간 */}
      <div className="board-info">
        <span>{type === 'cont' ? '대회 기간' : '프로젝트 기간'}:</span>
        <span>
          {post.startDate} ~ {post.endDate}
        </span>
      </div>

      {/* 게시글 유형별 추가 정보 */}
      {renderAdditionalInfo()}

      {/* 게시글 본문 */}
      <div className="board-content">
        {post.description && <div className="board-description">{post.description}</div>}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* 첨부 파일 */}
      {post.fileUrls?.length > 0 && (
        <div className="file-list">
          <h6>첨부 파일</h6>
          {post.fileUrls.map((file, index) => (
            <div key={index} className="file-item">
              <a href={file} target="_blank" rel="noopener noreferrer">
                파일 {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}

      {/* 댓글 섹션 */}
      <div className="comments-section">
        <div className="comment-header">댓글 {comments.length}</div>

        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-info">
              <span className="comment-author">{comment.authorName}</span>
              <span className="comment-date">{comment.createdAt}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
          </div>
        ))}

        {/* 댓글 작성 폼 */}
        <div className="comment-form">
          <Form onSubmit={handleSubmitComment}>
            <textarea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글 작성하기"
            />
            <Button type="submit" className="comment-submit">
              등록하기
            </Button>
          </Form>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="button-group">
        {accessToken && (
          <>
            <Button variant="outline-primary" onClick={() => navigate(`/posts/${type}/${id}/edit`)}>
              수정하기
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              삭제하기
            </Button>
          </>
        )}
        <Button variant="secondary" onClick={() => navigate(`/posts/${type}`)}>
          목록으로
        </Button>
      </div>
    </div>
  );
}

export default ViewPost;
