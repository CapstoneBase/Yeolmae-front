/* eslint-disable no-alert */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Button from '../../Common/Button';
import usePageTitle from '../../../hooks/usePageTitle';

const baseAPI = axios.create({
  baseURL: 'api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

function SignupPage() {
  const dispatch = useDispatch();
  const [chkDup, setChkDup] = useState(false);
  const [input, setInput] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    school: '',
    major: '',
    verificationcode: ''
  });
  const navigate = useNavigate();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [toast, setToast] = useState(false);

  usePageTitle('회원가입');
  const onChange = (e) => {
    if (e.target.name === 'id') {
      setChkDup(false);
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const actDupCheck = async (id) => {
    const API = `/members/check-id?id=${id}`;
    // console.log('request body: ', body);
    try {
      console.log('id duplicate check try');
      const response = await baseAPI.get(API);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
      } else if (error.request) {
        console.log('No response received: ', error.request);
      } else {
        console.log('Error setting up request: ', error.message);
      }
      throw error;
    }
  };

  const idDupCheck = (id) => async () => {
    try {
      const data = await actDupCheck(id);
      // dispatch(SET_USER(data.user));
      if (data) {
        alert(`[${id}]은(는) 중복된 아이디입니다.`);
      } else {
        alert(`[${id}]은(는) 중복되지 않은 아이디입니다.`);
        setChkDup(true);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  // #####################################################################
  // 중복체크
  // #####################################################################
  const handleDuplicate = async (e) => {
    e.preventDefault();
    if (!input.id) {
      return alert('ID를 입력해주세요.');
    }
    // 로그인 후 비밀번호 입력값 제거
    // setInput(input.password, '');
    try {
      await dispatch(idDupCheck(input.id));
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      const response = await baseAPI.post('/members/send-code', { email: input.email });
      alert('이메일로 인증 코드가 발송되었습니다.');
      setIsEmailSent(true);
    } catch (error) {
      console.error(error);
      alert('이메일 인증 코드 발송 중 오류가 발생했습니다.');
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await baseAPI.post('/members/verify-code', {
        email: input.email,
        code: input.code
      });
      alert('이메일 인증이 완료되었습니다.');
      setIsEmailVerified(true);
    } catch (error) {
      console.error(error);
      alert('이메일 인증 코드 확인 중 오류가 발생했습니다.');
    }
  };

  const actSignup = async (body) => {
    const API = '/members';
    // console.log('request body: ', body);
    try {
      console.log('actsignup try');
      const response = await baseAPI.post(`${API}`, body);
      return response.data.data;
    } catch (error) {
      if (error.response) {
        console.log('request body: ', body);
        console.log('error : ', error.response);
        const { status, statusText, data } = error.response;
        console.log(`${status} - ${statusText} - ${data.message}`);
      } else if (error.request) {
        console.log('No response received: ', error.request);
      } else {
        console.log('Error setting up request: ', error.message);
      }
      throw error;
    }
  };

  const doSignup = (param) => async () => {
    try {
      console.log('dosignup try');
      const data = await actSignup(param);
      if (data) {
        alert(`성공적으로 가입되었습니다. 로그인 해주세요.`);
        navigate('/login');
      } else {
        alert(`회원 가입 중 오류가 발생하였습니다. ${data}`);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  // #####################################################################
  // 아이디 유효성 검사
  // #####################################################################
  const condId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{2,16}$/;
  const condPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{10,99}$/;
  const validId = condId.test(input.id); // id 유효성 검사
  const validPw = condPw.test(input.password); // password 유효성 검사

  // #####################################################################
  // 가입하기
  // #####################################################################
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.id) {
      return alert('ID를 입력해주세요.');
    }
    if (!validId) {
      return alert('유효하지 않은 아이디입니다.');
    }
    if (!chkDup) {
      return alert('아이디 중복확인을 해주세요.');
    }
    if (!input.password) {
      return alert('비밀번호를 입력해주세요.');
    }
    if (!validPw) {
      return alert('유효하지 않은 비밀번호입니다.');
    }
    if (input.password !== input.confirmPassword) {
      return alert('비밀번호가 일치하지 않습니다.');
    }
    if (!input.name) {
      return alert('이름을 입력해주세요.');
    }
    if (!input.email) {
      return alert('이메일을 입력해주세요.');
    }
    if (!isEmailVerified) {
      return alert('이메일 인증을 완료해주세요.');
    }

    const body = {
      id: input.id,
      password: input.password,
      name: input.name,
      email: input.email,
      school: input.school,
      major: input.major,
      verificationCode: input.code
    };

    // 로그인 후 비밀번호 입력값 제거
    // setInput(input.password, '');

    dispatch(doSignup(body));
    return null;
  };

  // #####################################################################
  // 출력
  // #####################################################################
  return (
    <container className="container g-3">
      <h1 className="h2 mb-3 fw-500">회원가입</h1>
      <form className="form-signin p-3 m-auto" style={{ maxWidth: '400px' }}>
        <div className="form-floating my-2">
          <input
            type="text"
            className="form-control"
            id="floatingId"
            name="id"
            placeholder="아이디를 입력해주세요"
            autoComplete="off"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingId">아이디</label>
          <Button onClick={handleDuplicate} text="중복확인" />
        </div>
        {input.id !== '' && !validId && (
          <div className="form-text text-danger">
            아이디는 2~16자 이내의 영문, 숫자만 가능합니다.
          </div>
        )}
        <div className="form-floating my-2">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingPassword">비밀번호</label>
        </div>
        {input.password !== '' && !validPw && (
          <div className="form-text text-danger">
            비밀번호는 10자 이상의 영문(대소문자), 숫자만 가능합니다.
          </div>
        )}
        <div className="form-floating my-2">
          <input
            type="password"
            className="form-control"
            id="floatingConfirmPassword"
            name="confirmPassword"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingConfirmPassword">비밀번호 확인</label>
        </div>
        {input.confirmPassword !== '' && input.password !== input.confirmPassword && (
          <div className="form-text text-danger">비밀번호가 일치하지 않습니다.</div>
        )}
        <div className="form-floating my-2">
          <input
            type="text"
            className="form-control"
            id="floatingEmail"
            name="email"
            placeholder="이메일을 입력해주세요"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingName">이메일</label>
          <Button onClick={sendVerificationCode} text="이메일인증" />
        </div>
        {isEmailSent && (
          <div className="form-floating my-2">
            <input
              type="text"
              className="form-control"
              id="floatingCode"
              name="code"
              placeholder="이메일로 받은 인증코드를 입력해주세요"
              onChange={onChange}
              required
            />
            <label htmlFor="floatingCode">인증코드</label>
            <Button onClick={verifyCode} text="인증완료" />
          </div>
        )}
        <div className="form-floating my-2">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingName">이름</label>
        </div>
        <div className="form-floating my-2">
          <input
            type="text"
            className="form-control"
            id="floatingSchool"
            name="school"
            placeholder="학교를 입력해주세요"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingSchool">학교</label>
        </div>
        <div className="form-floating my-2">
          <input
            type="text"
            className="form-control"
            id="floatingMajor"
            name="major"
            placeholder="전공을 입력해주세요"
            onChange={onChange}
            required
          />
          <label htmlFor="floatingMajor">전공</label>
        </div>
        <Button text="가입하기" onClick={handleSubmit} />
      </form>
    </container>
  );
}

export default SignupPage;
