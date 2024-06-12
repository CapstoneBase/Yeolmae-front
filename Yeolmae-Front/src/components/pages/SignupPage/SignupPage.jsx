/* eslint-disable no-alert */
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Wrapper from '../../Common/Wrapper';
import Title from '../../Common/Title';
import InputWrapper from '../../Common/InputWrapper';
import AuthInputField from '../../Common/AuthInputField.jsx';
import Button from '../../Common/Button';
import ToastNotification from '../../Common/ToastNotification';
// import { loginUser } from '../../api/loginUser';
// import { SET_TOKEN, loginThunk, reissueTokenThunk } from '../../redux/modules/authSlice';
// import { loginThunk } from '../../../redux/modules/loginThunk';
import axiosAuthInstance from '../../../api/axiosAuthInstance';

const Label = styled.label`
  text-align: left;
  flex-basis: 20%;
`;
const Hint = styled.span`
  display: block;
  flex-basis: 20%;
  line-height: 15px;
  margin: 0px;
  padding: 0px;
  font-size: 15px;
  color: red;
  margin-bottom: 10px;
`;

function SignupPage() {
  const dispatch = useDispatch();
  const [chkDup, setChkDup] = useState(false);
  const [input, setInput] = useState({
    id: '',
    password: '',
    name: ''
  });

  const [toast, setToast] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === 'id') {
      setChkDup(false);
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  // const resetInput = (e) => {
  //   setInput({
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const API = '/api/v1/login';
  const actDupCheck = async (id) => {
    const API = '/users/check';
    const body = { id };

    // console.log('request body: ', body);
    try {
      console.log('id duplicate check try');
      const response = await axiosAuthInstance.post(`${API}`, body);
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

    dispatch(idDupCheck(input.id));
    return null;
  };

  const actSighup = async (body) => {
    const API = '/users';
    // console.log('request body: ', body);
    try {
      const response = await axiosAuthInstance.post(`${API}`, body);
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

  const doSighup = (param) => async () => {
    try {
      const data = await actSighup(param);
      // dispatch(SET_USER(data.user));
      if (data) {
        alert(`성공적으로 가입되었습니다. 로그인 해주세요.`);
        navigate('/loginpage');
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
    if (!input.name) {
      return alert('이름을 입력해주세요.');
    }
    const body = {
      id: input.id,
      password: input.password,
      name: input.name
    };

    // 로그인 후 비밀번호 입력값 제거
    // setInput(input.password, '');

    dispatch(doSighup(body));
    return null;
  };

  // #####################################################################
  // 출력
  // #####################################################################
  return (
    <>
      <Wrapper>
        <Title>회원가입하기</Title>
        <InputWrapper>
          <Label>아이디</Label>
          <AuthInputField
            id="id"
            name="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            autoComplete="off"
            onChange={onChange}
            // onClick={resetInput}
            required
          />
          <Button onClick={handleDuplicate} text="중복확인" />
        </InputWrapper>
        {input.id !== '' && !validId && <Hint>아이디는 2~16자 이내의 영문,숫자만 가능합니다.</Hint>}
        <InputWrapper>
          <Label>비밀번호</Label>
          <AuthInputField
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChange}
            // onClick={resetInput}
            required
          />
        </InputWrapper>
        {input.password !== '' && !validPw && (
          <Hint>비밀번호는 10자 이상의 영문(대소문자), 숫자만 가능합니다.</Hint>
        )}
        <InputWrapper>
          <Label>이름</Label>
          <AuthInputField
            id="name"
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            onChange={onChange}
            // onClick={resetInput}
            required
          />
        </InputWrapper>
        <Button onClick={handleSubmit} text="가입하기" />
      </Wrapper>
      {toast === true ? (
        <ToastNotification
          text="존재하지 않는 아이디이거나 잘못된 비밀번호입니다."
          props={setToast}
        />
      ) : null}
    </>
  );
}

export default SignupPage;
