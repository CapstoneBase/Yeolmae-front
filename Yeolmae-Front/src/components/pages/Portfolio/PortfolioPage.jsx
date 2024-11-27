import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_CONTEST_POSTS = '/api/v1/portfolio/contest-posts';
const API_GRADUATION_PROJECT_POSTS = '/api/v1/portfolio/graduation-project-posts';
const API_OTHER_PROJECT_POSTS = '/api/v1/portfolio/other-project-posts';

function PortfolioPage() {
  const [contestPosts, setContestPosts] = useState([]);
  const [graduationProjectPosts, setGraduationProjectPosts] = useState([]);
  const [otherProjectPosts, setOtherProjectPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('로그인이 필요합니다.');
        }

        const [contestResponse, graduationResponse, otherResponse] = await Promise.all([
          axios.get(API_CONTEST_POSTS, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }),
          axios.get(API_GRADUATION_PROJECT_POSTS, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }),
          axios.get(API_OTHER_PROJECT_POSTS, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
        ]);

        setContestPosts(contestResponse.data);
        setGraduationProjectPosts(graduationResponse.data);
        setOtherProjectPosts(otherResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <h1>내 포트폴리오</h1>

      <section className="mb-4">
        <h2>공모전 게시물</h2>
        <div className="row">
          {contestPosts.map((post) => (
            <div key={post.postId} className="col-md-4 mb-3">
              <div className="card">
                <img src={post.thumbnail} className="card-img-top" alt={`${post.title} 썸네일`} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="card-text">
                    {post.startDate} - {post.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2>졸업 프로젝트 게시물</h2>
        <div className="row">
          {graduationProjectPosts.map((post) => (
            <div key={post.postId} className="col-md-4 mb-3">
              <div className="card">
                <img src={post.thumbnail} className="card-img-top" alt={`${post.title} 썸네일`} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="card-text">
                    {post.startDate} - {post.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <h2>기타 프로젝트 게시물</h2>
        <div className="row">
          {otherProjectPosts.map((post) => (
            <div key={post.postId} className="col-md-4 mb-3">
              <div className="card">
                <img src={post.thumbnail} className="card-img-top" alt={`${post.title} 썸네일`} />
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="card-text">
                    {post.startDate} - {post.endDate}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PortfolioPage;
