import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from './ContPostDetail';
import '../../../../scss/viewPostStyle.scss';

function ViewContPost() {
  const { id } = useParams(); // useParams의 key를 라우트와 일치시킴
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  const getBoard = async (postId) => {
    try {
      const response = await axios.get(`/api/v1/contest-posts/${postId}`);
      setBoard(response.data);
    } catch (error) {
      console.error('Error fetching the post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getBoard(id); // id를 API 호출에 사용
    }
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <PostDetail
        id={board.id}
        authorName={board.authorName}
        title={board.title}
        mainCategory={board.mainCategory}
        description={board.description}
        content={board.content}
        hostingOrganization={board.hostingOrganization}
        sponsoringOrganization={board.sponsoringOrganization}
        relatedWebsite={board.relatedWebsite}
        startDate={board.startDate}
        endDate={board.endDate}
        fileUrls={board.fileUrls}
        createdAt={board.createdAt}
      />
    </div>
  );
}

export default ViewContPost;
