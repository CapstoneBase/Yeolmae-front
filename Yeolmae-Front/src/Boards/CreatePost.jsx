import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/Common/Button';
import Wrapper from '../components/Common/Wrapper';
import './style.css';

const Title = styled.h2`
  display: flex;
  justify-contents: left;
  font-size: 25px;
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

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  margin: 10px 0px 10px 0px;
`;
const BoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  background-color: white;
`;

function CreatePost() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const { resetBoard } = useState();
  // effect : 마운트 시 실행할 함수
  /* useEffect(() => {
    resetBoard();
  }, []); */

  const handleSubmit = (e) => {};
  return (
    <Wrapper>
      <Title>게시글 작성하기</Title>
      <BoardWrapper>
        <BoardContainer>
          <div className="CreateBoardTitleBox">
            <Input className="InputBoardTitle" type="text" placeholder="제목" value={title} />
          </div>
        </BoardContainer>
        <BoardContainer>
          <div className="CreateBoardContentBox">
            <textarea className="InputBoardTextarea" placeholder="본문" value={content} />
          </div>
        </BoardContainer>
        <BoardContainer>
          <Input type="file" />
        </BoardContainer>
      </BoardWrapper>
      <Button onClick={handleSubmit} text="작성완료" />
    </Wrapper>
  );
}
export default CreatePost;
