import React, { ReactChild, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import QuillEditor from './QuillEditor';
// import axios from '../hooks/useAxios';
// import Categories from '../../Common/Categories';
import SelectBox from '../../Common/SelectBox';
import Button from '../../Common/Button';
import './createPostStyle.css';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1'
];

const BoardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  margin: 10px 0px 10px 0px;
`;

function CreatePost() {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const [input, setInput] = useState({
    category: '',
    parentCategory: '',
    title: '',
    content: '',
    imageUrl: ''
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  /* const { resetBoard } = useState();
  // effect : 마운트 시 실행할 함수
  useEffect(() => {
    resetBoard();
  }, []); */

  const navigate = useNavigate();

  const submitPost = (e) => {
    e.preventDefault();
    if (!input.title) {
      return alert('제목을 입력해주세요.');
    }
    if (!input.content) {
      return alert('내용을 입력해주세요.');
    }

    const body = {
      category: input.category,
      parentCategory: input.parentCategory,
      title: input.title,
      content: input.content,
      imageUrl: input.imageUrl
    };

    // 현재 페이지 url의 파라미터 가져와 postID 저장하기
    const postId = document.location.href.split('?');
    body.append('postId', postId);

    axios
      .post('/api/v1/posts', body)
      .then((res) => {
        console.log(input);
        console.log(res.data);
        // console.log(res);
        if (res.status === 200) {
          console.log('게시글 작성 성공');
          navigate('/{postsid}');
        }
      })
      .catch((err) => {
        console.log(input);
        console.error(err.response);
        if (err.response.status === 403) {
          alert('게시글 업로드에 실패하였습니다.');
        }
      });
    return null;
  };

  return (
    <div className="Wrapper">
      <BoardWrapper>
        <div className="SelectboxContainer">
          <SelectBox />
          <SelectBox />
        </div>
        <div className="CreateBoardTitleBox">
          <input
            className="InputBoardTitle"
            id="title"
            name="title"
            type="text"
            placeholder="제목"
            onChange={onChange}
          />
        </div>
        <div className="CreateBoardContentBox">
          <QuillEditor
            quillRef={quillRef}
            className="InputBoardQuill"
            id="content"
            name="content"
            type="text"
            placeholder="내용"
            onChange={onChange}
          />
        </div>
        <div className="UploadFile">
          <input type="file" text="파일 첨부" />
        </div>
        <Button onClick={submitPost} text="작성완료" />
      </BoardWrapper>
    </div>
  );
}
export default CreatePost;
