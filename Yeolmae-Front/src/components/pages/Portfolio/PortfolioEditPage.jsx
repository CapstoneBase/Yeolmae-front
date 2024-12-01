import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import createApiRequest from '../../../api/queryStrReq';
import Button from '../../Common/Button';

/**
 * 인적사항 이름을 표시하는 공통 인풋 컴포넌트
 * @param {Object} input - 수정할 정보를 받아와 표시
 * @param {string} input.label - 수정할 인적사항의 라벨
 * @param {any} input.props - 수정할 인적사항 값을 받아와 표시
 */
function CustomInput({ label, ...props }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}

function PortfolioEditPage() {
  /**
   * 로컬 스토리지에서 엑세스 토큰을 받아와 변수에 저장
   */
  const accessToken = localStorage.getItem('accessToken');

  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [awardDate, setAwardDate] = useState(new Date());
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: '',
    birthDate: '',
    contact: [],
    selfIntroduction: null,
    experiences: [
      {
        title: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        title: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    skill: [],
    certifications: [],
    awards: [
      {
        title: '',
        description: '',
        awardDate: ''
      }
    ],
    contestPosts: [],
    graduationProjectPosts: [],
    otherProjectPosts: []
  });

  useEffect(() => {
    /**
     * 수정 반영 함수
     * 포트폴리오 수정 api(get) 호출하여 최초 1회 userInfo의 각 필드에 정보 저장
     */
    const fetchUserInfo = async () => {
      const response = await createApiRequest('/portfolio', null, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUserInfo(response);
      console.log('userInfo: ', userInfo);
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }));
    // console.log(value);
  };

  /**
   * 수정 등록 버튼,
   * 포트폴리오 수정 api(put) 호출하여 수정된 정보 저장, 포트폴리오 조회 페이지로 이동
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createApiRequest('/portfolio', null, {
      method: 'PUT',
      data: userInfo,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log('Updated user info:', userInfo);
    navigate('/portfolioPage');
  };

  return (
    <>
      <div className="row mx-5 my-4 px-4">
        <h2>포트폴리오 수정하기</h2>
      </div>
      <div className="row mx-5 px-4 justify-content-between">
        <CustomInput
          label="이름"
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
        />
        <label className="form-label me-3 mb-3">생년월일</label>
        <DatePicker
          label="생년월일"
          className="form-control"
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          dateFormat="yyyy-MM-dd"
          name="birthDate"
          value={userInfo.birthDate}
        />
        {/* <label className="form-label">생년월일</label>
      <DatePicker
        selected={birthDate}
        onChange={(date) => setBirthDate(date)}
        dateFormat="yyyy-MM-dd"
        className="form-control mb-3"
        value={userInfo.birthDate}
      /> */}
        <div className="mb-3">
          <label className="form-label">자기소개</label>
          <textarea
            className="form-control"
            type="text"
            name="selfIntroduction"
            value={userInfo.selfIntroduction}
            onChange={handleChange}
          />
        </div>

        <div className="my-4">
          <label className="form-label">경력</label>
          {/**
           * @todo DatePicker로 시작 날짜는 설정 가능
           */}
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            name="startDate"
            dateFormat="yyyy-MM-dd"
            value={userInfo.experiences.startDate}
          />
          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date) => setStartDate(date)}
            name="endDate"
            dateFormat="yyyy-MM-dd"
            value={userInfo.experiences.endDate}
          />
        </div>
        {/**
        @todo 자기소개 이후로 각 포트폴리오 항목 반영하도록 컴포넌트 작성 
        */}
        <div className="row d-flex mx-2 px-4 justify-content-center">
          <div className="row m-1 justify-content-center">
            <div className="col-2">
              <Button onClick={handleSubmit} text="수정하기" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioEditPage;
