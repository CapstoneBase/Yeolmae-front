import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import createApiRequest from '../../../api/queryStrReq';
import Button from '../../Common/Button';

function CustomInput({ label, ...props }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input className="form-control" {...props} />
    </div>
  );
}

function PortfolioEditPage(params) {
  const initialUserInfo = {
    name: '김열매',
    birthDate: '2000-10-10',
    email: 'kym@example.com',
    phone: '010-1234-5678',
    address: '서울시 강남구',
    introduction: '김열매라고 합니다'
  };
  const accessToken = localStorage.getItem('accessToken');

  const [birthDate, setBirthDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [awardDate, setAwardDate] = useState(new Date());

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
    const fetchUserInfo = async () => {
      const response = await createApiRequest('/portfolio', null, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUserInfo(response);
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
  };

  return (
    <>
      <div className="row mx-5 my-4 px-4">
        <h2>포트폴리오 수정하기</h2>
      </div>
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
      <CustomInput
        label="연락처"
        type="text"
        name="phone"
        value={userInfo.phone}
        onChange={handleChange}
      />

      <div className="my-4">
        <label className="form-label">경력</label>
        {/* <DatePicker
          className="form-control"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          name="startDate"
          dateFormat="yyyy-MM-dd"
          value={userInfo.experiences.startDate}
        /> */}
        <input type="text" aria-label="First name" className="form-control mb-1" />
        <input type="text" aria-label="First name" className="form-control mb-1" />
        <input type="text" aria-label="Last name" className="form-control" />
      </div>
      <Button onClick={handleSubmit} text="수정하기" />
    </>
  );
}

export default PortfolioEditPage;
