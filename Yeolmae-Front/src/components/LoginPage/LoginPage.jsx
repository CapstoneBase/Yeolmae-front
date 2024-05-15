/* eslint-disable no-alert */
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '../Common/Button';
import Wrapper from '../Common/Wrapper';

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
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(108, 108, 108, 1);
  font-size: 13px;
  margin: 10px 3px;

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

  const navigate = useNavigate();
  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const API = 'https://879df4a7-14ca-442b-a753-788449ea4109.mock.pstmn.io/api/v1/login';
  // const API = '';

  const handleSubmit = (e) => {
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

    axios
      .post(API, body)
      .then((res) => {
        // const { accessToken } = res.data;
        // if (accessToken) {
        //   localStorage.setItem('accessToken', accessToken);
        // }
        console.log(input);
        console.log(res.data);
        // console.log(res);
        if (res.status === 200) {
          console.log('로그인 성공');
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(input);
        console.error(err.response);
        if (err.response.status === 400) {
          alert('로그인에 실패하였습니다.');
        }
      });
  };

  return (
    <Wrapper>
      <Title>로그인</Title>
      <InputWrapper>
        {/* <label>아이디</label> */}
        <Input
          id="id"
          name="id"
          type="text"
          // value={id}
          placeholder="아이디를 입력해주세요"
          autoComplete="off"
          onChange={onChange}
          required
        />
        {/* <label>비밀번호</label> */}
        <Input
          id="password"
          name="password"
          type="password"
          // value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={onChange}
          required
        />
        <LinkWrapper>
          <StyledLink to="/">아이디 찾기</StyledLink>
          <StyledLink to="/">비밀번호 찾기</StyledLink>
        </LinkWrapper>
      </InputWrapper>
      <Button onClick={handleSubmit} text="로그인하기" />
    </Wrapper>
  );
}

export default Login;
