import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PorfolioInfo from './PortfolioInfo';
import PortfolioPDFButton from './PortfolioPDFButton';
import AuthButton from '../../Common/AuthButton';

const API_INFO = '/api/v1/portfolio';
const API_CONTEST_POSTS = '/api/v1/portfolio/contest-posts';
const API_GRADUATION_PROJECT_POSTS = '/api/v1/portfolio/graduation-project-posts';
const API_OTHER_PROJECT_POSTS = '/api/v1/portfolio/other-project-posts';

/**
 * 인적사항 이름을 표시하는 공통 컴포넌트
 * @param {Object} properties - 인적사항
 * @param {string} properties.label - 인적사항 라벨
 * @param {any} properties.value - 인적사항 값
 */
function InfoRow({ label, value }) {
  return (
    <div className="row m-1 justify-items-center">
      <div className="col-2 mx-2">
        <h6>{label}</h6>
      </div>
      <div className="col-6">
        <div>{value}</div>
      </div>
    </div>
  );
}

/**
 * 경력, 학력, 수상 내역 등의 내역을 보여주는 공통 컴포넌트
 * @param {Object} experiencesInfo - 내역을 구성하는 속성들
 * @param {String} experiencesInfo.title - 내역 제목
 * @param {any} experiencesInfo.startDate - 내역의 시작 일시
 * @param {any} experiencesInfo.endDate - 내역의 종료 일시
 * @param {String} experiencesInfo.description - 내역의 설명
 */
function InfoCard({ title, startDate, endDate, description }) {
  return (
    <div className="card m-3 border-0 bg-body-tertiary bg-opacity-50">
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
    <>
      <div className="container mt-5">
        <div className="row mx-5 my-4 px-4">
          <h2>나의 포트폴리오</h2>
        </div>
        <div className="row mx-5 px-4 justify-content-between">
          <div className="col-4 d-flex justify-content-start align-items-center">
            <h4>{info.name}</h4>
          </div>
          <div className="col-10 mx-2 my-4 p-2 justify-items-center">
            <InfoRow label="생년월일" value={info.birthDate} />
            <InfoRow label={info.contact[0].type} value={info.contact[0].value} />
            <InfoRow label="자기소개" value={info.selfIntroduction} />
            <div className="col-12 d-flex py-3 justify-content-start align-items-center border-bottom">
              <h4>경력</h4>
            </div>
            {/* 경력 배열을 index를 기준으로 map으로 나열 */}
            {info.experiences.map((index) => (
              <InfoCard
                key={index.id}
                title={index.title}
                startDate={index.startDate}
                endDate={index.endDate}
                description={index.description}
              />
            ))}
            <div className="col-12 d-flex py-3 justify-content-start align-items-center border-bottom">
              <h4>학력</h4>
            </div>
            {/* 학력 배열을 index를 기준으로 map으로 나열 */}
            {info.education.map((index) => (
              <InfoCard
                key={index.id}
                title={index.title}
                startDate={index.startDate}
                endDate={index.endDate}
                description={index.description}
              />
            ))}
            <div className="col-12 d-flex py-3 justify-content-start align-items-center border-bottom">
              <h4>수상 내역</h4>
            </div>
            {/* 수상 내역 배열을 index를 기준으로 map으로 나열 */}
            {info.awards.map((index) => (
              <InfoCard
                key={index.id}
                title={index.title}
                startDate={index.startDate}
                endDate={index.endDate}
                description={index.description}
              />
            ))}
            <div className="col-12 d-flex py-3 justify-content-start align-items-center border-bottom">
              <h4>자격증</h4>
            </div>
            <div className="row m-1 justify-items-center">
              {info.certifications.map((index) => (
                <div className="row">
                  <div className="col-6 m-1">
                    <h6>{index}</h6>
                  </div>
                </div>
              ))}
            </div>

            <div className="row py-3 border-bottom">
              <div className="col-2 d-flex justify-content-start align-items-center">
                <h4>스킬</h4>
              </div>
              <div className="col-8 d-flex justify-content-start align-items-center">
                {info.skill.map((index) => (
                  <span className="badge text-bg-secondary mx-2">{index}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="row mx-5 px-4 justify-content-between">
            <h2 className="pb-2">공모전 게시물</h2>
            {contestPosts.map((post) => (
              <div key={post.postId} className="col-md-10 mb-3">
                <div className="card">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                        <p className="card-text">
                          {post.startDate} - {post.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="col-4 justify-content-end">
                      <img
                        src={post.thumbnail}
                        className="img-thumbnail justify-content-end"
                        style={{
                          maxWidth: '200px',
                          maxHeight: '150px',
                          objectFit: 'cover' // 이미지 비율 유지하면서 영역에 맞춤
                        }}
                        alt={`${post.title} 썸네일`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <div className="row mx-5 px-4 justify-content-between">
            <h2 className="pb-2">졸업 프로젝트 게시물</h2>
            {graduationProjectPosts.map((post) => (
              <div key={post.postId} className="col-md-10 mb-3">
                <div className="card">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                        <p className="card-text">
                          {post.startDate} - {post.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="col-4">
                      <img
                        src={post.thumbnail}
                        className="card-img-top"
                        style={{
                          maxWidth: '200px',
                          maxHeight: '150px',
                          objectFit: 'cover' // 이미지 비율 유지하면서 영역에 맞춤
                        }}
                        alt={`${post.title} 썸네일`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-4">
          <div className="row mx-5 px-4 justify-content-between">
            <h2 className="pb-2">개인 프로젝트 게시물</h2>
            {otherProjectPosts.map((post) => (
              <div key={post.postId} className="col-md-10 mb-3">
                <div className="card">
                  <div className="row">
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.description}</p>
                        <p className="card-text">
                          {post.startDate} - {post.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="col-4 justify-content-end">
                      <img
                        src={post.thumbnail}
                        className="card-img-top"
                        style={{
                          maxWidth: '200px',
                          maxHeight: '150px',
                          objectFit: 'cover' // 이미지 비율 유지하면서 영역에 맞춤
                        }}
                        alt={`${post.title} 썸네일`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <PortfolioPDFButton
        info={info}
        contestPosts={contestPosts}
        graduationProjectPosts={graduationProjectPosts}
        otherProjectPosts={otherProjectPosts}
      />
      <div
        // className="col-4 d-flex justify-content-end px-5"
        style={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          zIndex: 1000
        }}
      >
        <AuthButton
          text="포트폴리오 편집하기"
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
          destination="/portfolio/edit"
        />
      </div>
    </>
  );
}

export default PortfolioPage;
