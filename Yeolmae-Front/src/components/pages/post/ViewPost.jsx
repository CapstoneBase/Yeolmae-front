import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { fetchPost, fetchComments, createComment, deletePost } from '../../../api/index';
import GradCategories from '../../Common/Categories/GradCategories';
import ContCategories from '../../Common/Categories/ContCategories';
import OtherCategories from '../../Common/Categories/OtherCategories';
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

  const getCategoryName = (categoryId, type) => {
    if (!categoryId) return '';

    if (type === 'grad') {
      // 메인 카테고리 찾기
      const mainCategory = GradCategories.categories.find((cat) => cat.id === categoryId);
      if (mainCategory) return mainCategory.name;

      // 서브 카테고리 찾기
      const subCategory = GradCategories.categories
        .flatMap((cat) => cat.subCategories)
        .find((sub) => sub.id === categoryId);

      return subCategory ? subCategory.name : '';
    }

    if (type === 'cont') {
      const category = ContCategories.categories.find((cat) => cat.id === categoryId);
      return category ? category.name : '';
    }

    if (type === 'other') {
      const mainCategory = OtherCategories.categories.find((cat) => cat.id === categoryId);
      if (mainCategory) return mainCategory.name;

      const subCategory = OtherCategories.categories
        .flatMap((cat) => cat.subCategories)
        .find((sub) => sub.id === categoryId);

      return subCategory ? subCategory.name : '';
    }

    return '';
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="board-detail-container">
      {/* 카테고리 정보 */}
      <div className="category-navigation">
        <Link to={`/posts/${type}`} className="category-link">
          {POST_TYPE_TITLES[type]}
        </Link>
        {' > '}
        <Link to={`/posts/${type}?mainCategory=${post.mainCategory}`} className="category-link">
          {getCategoryName(post.mainCategory, type)}
        </Link>
        {post.subCategory && (
          <>
            {' > '}
            <Link
              to={`/posts/${type}?mainCategory=${post.mainCategory}&subCategory=${post.subCategory}`}
              className="category-link"
            >
              {getCategoryName(post.subCategory, type)}
            </Link>
          </>
        )}
      </div>

      {/* 제목과 기본 정보 */}
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-info">
          <span>작성자: {post.authorName}</span>
          <span className="divider">|</span>
          <span>작성일: {post.createdAt}</span>
        </div>
      </div>

      {/* 기간 정보 */}
      <div className="post-info">
        <span>{type === 'cont' ? '대회 기간' : '프로젝트 기간'}: </span>
        <span>
          {post.startDate} ~ {post.endDate}
        </span>
      </div>

      {/* 게시글 유형별 추가 정보 - UI 통일 */}
      <div className="post-additional-info">
        {type === 'grad' && (
          <>
            <div className="info-row">
              <span className="info-label">학교:</span>
              <span className="info-value">{post.school || '없음'}</span>
              <span className="divider">|</span>
              <span className="info-label">전공:</span>
              <span className="info-value">{post.department || '없음'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">프로젝트 목표 및 활용방안:</span>
              <span className="info-value">{post.goalAndUtilization || '없음'}</span>
            </div>
          </>
        )}
        {type === 'cont' && (
          <>
            <div className="info-row">
              <span className="info-label">주최기관:</span>
              <span className="info-value">{post.hostingOrganization || '없음'}</span>
              <span className="divider">|</span>
              <span className="info-label">주관기관:</span>
              <span className="info-value">{post.sponsoringOrganization || '없음'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">관련 페이지:</span>
              {post.relatedWebsite ? (
                <a
                  href={post.relatedWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-link"
                >
                  {post.relatedWebsite}
                </a>
              ) : (
                '없음'
              )}
            </div>
          </>
        )}
        {type === 'other' && (
          <div className="info-row">
            <span className="info-label">프로젝트 목표 및 활용방안:</span>
            <span className="info-value">{post.goalAndUtilization || '없음'}</span>
          </div>
        )}
      </div>
      <hr />

      {/* 썸네일 이미지 섹션 추가 */}
      {post.thumbnail && (
        <div className="post-thumbnail">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="img-fluid"
            style={{
              maxWidth: '100%',
              height: 'auto',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      )}

      {/* 본문 내용 */}
      <div className="post-content">
        <div className="content-description">{post.description}</div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* 첨부 파일 */}
      {post.fileUrls?.length > 0 && (
        <div className="file-section">
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

        {/* 댓글 작성 폼 - Row로 정렬 */}
        <Row className="comment-form-row">
          <Col>
            <Form onSubmit={handleSubmitComment} className="d-flex gap-2">
              <Form.Control
                as="textarea"
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글 작성하기"
              />
              <Button type="submit" className="comment-submit">
                등록하기
              </Button>
            </Form>
          </Col>
        </Row>

        {/* 버튼 그룹 - 별도 Row */}
        <Row className="mt-3">
          <Col className="d-flex justify-content-end gap-2">
            {accessToken && (
              <>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate(`/posts/${type}/${id}/edit`)}
                >
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
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ViewPost;
