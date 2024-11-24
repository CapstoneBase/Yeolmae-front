import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from './PostDetail';
import './viewPostStyle.css';

function ViewPost() {
  const { id } = useParams(); // /board/:id와 동일한 변수명으로 데이터를 꺼낼 수 있다
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState({});

  const getBoard = async () => {
    try {
      const response = await axios.get(`/api/v1/graduation-project-posts/${id}`);
      setBoard(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching the post:', error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <PostDetail
          id={board.id}
          authorName={board.authorName}
          title={board.title}
          description={board.description}
          content={board.content}
          school={board.school}
          department={board.department}
          startDate={board.startDate}
          endDate={board.endDate}
          goalAndUtilization={board.goalAndUtilization}
          files={board.fileUrls}
          createdAt={board.createdAt}
        />
      )}
    </div>
  );
}

export default ViewPost;
