/* eslint-disable no-alert */
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../Common/Button';
import Wrapper from '../../Common/Wrapper';
import ToastNotification from '../../Common/ToastNotification';
// import { loginUser } from '../../api/loginUser';
// import { SET_TOKEN, loginThunk, reissueTokenThunk } from '../../redux/modules/authSlice';
import { loginThunk } from '../../../redux/modules/loginThunk';

const Title = styled.h2`
  display: flex;
  justify-contents: left;
`;

const Input = styled.input`
  display: flex;
  width: 80%;
  margin: 5px 0 10px 0;
  border: none;
  border-bottom: 2px solid rgba(220, 220, 220, 1);
  padding: 10px 0px;
  font-family: NotoSans Regular;

  &: focus {
    outline: none;
    border-bottom: 2px solid rgba(101, 88, 245, 1);
  }
`;

const InputWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(108, 108, 108, 1);
  font-size: 13px;
  margin: 3px 3px;

  &: hover {
    font-family: NotoSans SemiBold;
  }
`;

function Login() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    id: '',
    password: ''
  });

  const [toast, setToast] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.id) {
      return window.alert('ID를 입력해주세요.');
    }
    if (!input.password) {
      return alert('비밀번호를 입력해주세요.');
    }
    const body = {
      id: input.id,
      password: input.password
    };

    // 로그인 후 비밀번호 입력값 제거
    // setInput(input.password, '');

    dispatch(loginThunk(input.id, input.password));
    console.log('로그인');
    navigate('/');
  };

  return (
    <>
      <Wrapper>
        <Title>로그인</Title>
        <InputWrapper>
          {/* <label>아이디</label> */}
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="아이디를 입력해주세요"
            autoComplete="off"
            onChange={onChange}
            // onClick={resetInput}
            required
          />
          {/* <label>비밀번호</label> */}
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChange}
            // onClick={resetInput}
            required
          />
          {/* <LinkWrapper>
          <StyledLink to="/">아이디 찾기</StyledLink>
          <StyledLink to="/">비밀번호 찾기</StyledLink>
        </LinkWrapper> */}
          <LinkWrapper>
            <StyledLink to="/signupPage">회원가입하기</StyledLink>
          </LinkWrapper>
        </InputWrapper>
        <Button onClick={handleSubmit} text="로그인하기" />
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

export default Login;
