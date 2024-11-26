import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from './ContPostDetail';
import './viewPostStyle.css';

function ViewContPost() {
  const { postId } = useParams(); // /board/:id와 동일한 변수명으로 데이터를 꺼낼 수 있다
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  const getBoard = async (id) => {
    try {
      const response = await axios.get(`/api/v1/contest-posts/${id}`);
      setBoard(response.data);
    } catch (error) {
      console.error('Error fetching the post:', error);
    } finally {
      setLoading(false); // 성공 여부와 상관없이 로딩 상태를 종료
    }
  };

  useEffect(() => {
    if (postId) {
      getBoard(postId);
    }
  }, [postId]);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <PostDetail
          id={board.id}
          authorName={board.authorName}
          title={board.title}
          mainCategory={board.mainCategory}
          description={board.description}
          content={board.content}
          hostingOrganization={board.hostingOrganization}
          sponsorOrganization={board.sponsorOrganization}
          relatedWebsite={board.relatedWebsite}
          startDate={board.startDate}
          endDate={board.endDate}
          fileUrls={board.fileUrls}
          createdAt={board.createdAt}
        />
      )}
    </div>
  );
}

export default ViewContPost;
