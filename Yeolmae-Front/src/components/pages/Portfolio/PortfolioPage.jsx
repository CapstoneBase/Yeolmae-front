import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PorfolioInfo from './PortfolioInfo';

const API_INFO = '/api/v1/portfolio';
const API_CONTEST_POSTS = '/api/v1/portfolio/contest-posts';
const API_GRADUATION_PROJECT_POSTS = '/api/v1/portfolio/graduation-project-posts';
const API_OTHER_PROJECT_POSTS = '/api/v1/portfolio/other-project-posts';

function InfoRow({ label, value }) {
  return (
    <div className="row m-1 justify-items-center">
      <div className="col-2 mx-2">
        <h6>{label}</h6>
      </div>
      <div className="col-4">
        <div>{value}</div>
      </div>
    </div>
  );
}
function ExRow({ label, value }) {
  return (
    <div className="row m-1 justify-items-center">
      <div className="col-2 mx-2">
        <h6>{label}</h6>
      </div>
      <div className="col-4">
        <div>{value}</div>
      </div>
    </div>
  );
}

function InfoCard({ title, startDate, endDate, description }) {
  return (
    <div className="card m-3">
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <h5 className="card-title">{title}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {startDate}-{endDate}
            </h6>
          </div>
          <div className="col-8">
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioPage() {
  const [info, setInfo] = useState([]);
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

        const [infoResponse, contestResponse, graduationResponse, otherResponse] =
          await Promise.all([
            axios.get(API_INFO, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }),
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

        setInfo(infoResponse.data);
        setContestPosts(contestResponse.data);
        setGraduationProjectPosts(graduationResponse.data);
        setOtherProjectPosts(otherResponse.data);
        setLoading(false);
        console.log(infoResponse.data);
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
      <div className="row mx-5 my-4 px-4">
        <h2>나의 포트폴리오</h2>
      </div>
      <div className="row mx-5 px-4 justify-content-between">
        <div className="col-6 d-flex justify-content-start align-items-center">
          <h4>나의 정보</h4>
        </div>
        <div className="col-10 mx-2 my-4 p-2 justify-items-center">
          <InfoRow label="생년월일" value={info.birthDate} />
          <InfoRow label={info.contact[0].type} value={info.contact[0].value} />
          <InfoRow label="학교" value={info.school} />
          <InfoRow label="학과" value={info.major} />
          <InfoRow label="자기소개" value={info.selfIntroduction} />

          {info.experiences.map((index) => (
            <InfoCard
              key={index.id}
              title={index.title}
              startDate={index.startDate}
              endDate={index.endDate}
              description={index.description}
            />
          ))}
          {info.education.map((index) => (
            <InfoCard
              key={index.id}
              title={index.title}
              startDate={index.startDate}
              endDate={index.endDate}
              description={index.description}
            />
          ))}
          {info.awards.map((index) => (
            <InfoCard
              key={index.id}
              title={index.title}
              startDate={index.startDate}
              endDate={index.endDate}
              description={index.description}
            />
          ))}
        </div>
      </div>
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
