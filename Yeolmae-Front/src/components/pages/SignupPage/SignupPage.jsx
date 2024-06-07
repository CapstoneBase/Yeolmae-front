import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import axios from '../hooks/useAxios';
import Wrapper from '../../Common/Wrapper';
import Title from '../../Common/Title';
import InputWrapper from '../../Common/InputWrapper';
import AuthInputField from '../../Common/AuthInputField';
import Button from '../../Common/Button';

const InputContainer = styled.div`
  display: flex;
  width: 99%;
  flex-flow: row wrap;
  align-items: center;
`;
const TitleLabel = styled.label`
  // flex-grow: 0;
  // flex-shrink: 0;
  flex-basis: 20%;
`;
const ContentLabel = styled.label`
  // flex-grow: 0;
  // flex-shrink: 0;
  flex-basis: 40%;
`;
const SubmitButtonLabel = styled.label`
  // flex-grow: 0;
  // flex-shrink: 0;
  flex-basis: 20%;
`;
const ErrorMessage = {
  required: '필수 입력사항을 입력해주세요.',
  idPattern: '2~16자 이내의 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다.',
  passwordPattern: '대/소문자, 숫자 6자 이상이어야 합니다.',
  length: '2자~10자 이내여야 합니다.'
};

function Signup() {
  const [input, setInput] = useState({
    id: '',
    password: '',
    name: ''
  });

  const navigate = useNavigate();
  const [idValid, setIDValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const HandlerID = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    const IDRegex = /^[a-z0-9A-Z_.]{2,16}$/;
    if (IDRegex.test('id')) {
      setIDValid(true);
    } else {
      setIDValid(false);
    }
  };
  const HandlerPassword = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    const PasswordRegex = /^[A-Za-z0-9]{6,}$/;
    if (PasswordRegex.test('password')) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const checkRedundantID = (e) => {
    e.preventDefault();
    axios
      .post('/api/v1/users/check', { id: input.id })
      .then((res) => {
        console.log(input.id);
        // console.log(res);
        if (res.status === 200) {
          console.log('사용 가능한 아이디입니다.');
          alert('사용 가능한 아이디입니다.');
        }
      })
      .catch((err) => {
        console.log(input.id);
        console.error(err.response);
        if (err.response.status === 400) {
          alert('이미 존재하는 아이디입니다.');
        }
      });
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.id) {
      return alert('ID를 입력해주세요.');
    }
    if (!input.password) {
      return alert('비밀번호를 입력해주세요.');
    }
    if (!input.name) {
      return alert('이름을 입력해주세요.');
    }

    const body = {
      id: input.id,
      password: input.password,
      name: input.name
    };

    axios
      .post('/api/v1/users', body)
      .then((res) => {
        console.log(input);
        console.log(res.data);
        // console.log(res);
        if (res.status === 200) {
          console.log('회원가입 성공');
          navigate('/api/v1/login');
        }
      })
      .catch((err) => {
        console.log(input);
        console.error(err.response);
        if (err.response.status === 403) {
          alert('회원가입에 실패하였습니다.');
        }
      });
    return null;
  };

  return (
    <Wrapper>
      <Title>회원가입하기</Title>
      <InputWrapper>
        <InputContainer>
          <TitleLabel>아이디</TitleLabel>
          <ContentLabel>
            <AuthInputField id="id" name="id" type="form" value={input.id} onChange={HandlerID} />
          </ContentLabel>
          <SubmitButtonLabel>
            <Button onClick={checkRedundantID} text="중복확인" />
          </SubmitButtonLabel>
          {idValid && <p>사용 불가능한 아이디입니다.</p>}
        </InputContainer>
        <InputContainer>
          <TitleLabel>비밀번호</TitleLabel>
          <ContentLabel>
            <AuthInputField
              id="password"
              name="password"
              type="password"
              value={input.password}
              onChange={HandlerPassword}
            />
          </ContentLabel>
          {passwordValid && <p>사용 불가능한 비밀번호입니다.</p>}
        </InputContainer>
        <InputContainer>
          <TitleLabel>이름</TitleLabel>
          <ContentLabel>
            <AuthInputField
              id="name"
              name="name"
              type="text"
              value={input.name}
              onChange={(e) => setInput(e.target.value)}
            />
          </ContentLabel>
        </InputContainer>
      </InputWrapper>
      <Button onClick={handleSubmit} text="가입하기" />
    </Wrapper>
  );
}

export default Signup;
