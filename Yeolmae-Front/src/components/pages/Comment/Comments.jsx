import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Comments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getComments = async () => {
    try {
      const response = await axios.get(`/api/v1/graduation-project-posts/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          page: 1,
          size: 10
        }
      });
      setComments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      {loading ? (
        <h2>Loading comments...</h2>
      ) : (
        <div>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.authorName}</strong>
              </p>
              <p>{comment.content}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comments;
