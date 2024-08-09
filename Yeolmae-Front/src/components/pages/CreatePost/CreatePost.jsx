import React, { ReactChild, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import QuillEditor from './QuillEditor';
import { uploadImage } from '../../../api/uploadImage';
// import axios from '../hooks/useAxios';
// import SelectBox from '../../Common/SelectBox';
import Thumbnail from '../../Common/Thumbnail';
import FilesLabel from '../../Common/FilesLabel';
import Categories from '../../Common/Categories';
import Select from '../../Common/Select';
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

const imageServer = 'http://13.124.45.191:8080'; // 이미지 서버 URL

function CreatePost() {
  const refreshToken = localStorage.getItem('refreshToken');
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const [input, setInput] = useState({
    category: '000101', // Default. 인문학일반(000101)
    parentCategory: '0001', // Default. 인문학(0001)
    title: '',
    content: '',
    imageUrl: '',
    fileUrlList: []
  });

  const onChange = (e) => {
    setInput({
      ...input,
      content: quillRef.current.editor.root.innerHTML,
      [e.target.name]: e.target.value
    });
  };

  /* const { resetBoard } = useState();
  // effect : 마운트 시 실행할 함수
  useEffect(() => {
    resetBoard();
  }, []); */

  const navigate = useNavigate();

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기
    formData.append('multipartFile', file);

    // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
    const res = await uploadImage(formData);
    if (res.length === 0 || !res[0].fileUrl) {
      alert('이미지 업로드에 실패하였습니다.');
    }

    const imageUrl = `${imageServer}${res[0].fileUrl}`;
    setInput({
      ...input,
      content: quillRef.current.editor.root.innerHTML,
      imageUrl
    });
  };

  const handleAttach = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기
    formData.append('multipartFile', file);

    // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
    const res = await uploadImage(formData);
    if (res.length === 0 || !res[0].fileUrl) {
      alert('파일 업로드에 실패하였습니다.');
    }

    const fileUrl = `${res[0].fileUrl}`;
    setInput({
      ...input,
      content: quillRef.current.editor.root.innerHTML,
      fileUrlList: [...input.fileUrlList, fileUrl]
    });
    e.target.value = '';
  };

  const submitPost = (e) => {
    e.preventDefault();

    if (!input.title) {
      return alert('제목을 입력해주세요.');
    }

    input.content = quillRef.current.getEditor().getText(); // 태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
    if (!input.content) {
      return alert('내용을 입력해주세요.');
    }

    const body = {
      category: input.category,
      parentCategory: input.parentCategory,
      title: input.title,
      content: input.content,
      imageUrl: input.imageUrl,
      fileUrlList: input.fileUrlList
    };

    // 현재 페이지 url의 파라미터 가져와 postID 저장하기
    // const postId = document.location.href.split('?');
    // body.append('postId', postId);

    axios
      .post('/api/v1/posts', body, { headers: { Authorization: `Bearer ${refreshToken}` } })
      .then((res) => {
        console.log(input);
        console.log(res.data);
        // console.log(res);
        if (res.status === 200) {
          console.log('게시글 작성 성공');
          const postsid = res.data.data;
          navigate(`/postlistPage`);
        }
      })
      .catch((err) => {
        console.log(input);
        console.error(err);
        if (!err.response || err.response.status === 403) {
          alert('게시글 업로드에 실패하였습니다.');
        }
      });
    return null;
  };

  return (
    <form className="Wrapper">
      <div className="SelectboxContainer">
        <Select
          key="selParentCategory"
          name="parentCategory"
          onChange={onChange}
          value={input.parentCategory}
        >
          {Categories.map((item) =>
            item.parntCateId === '00' ? (
              <option key={`selParentCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
        <Select key="selCategory" name="category" onChange={onChange} value={input.category}>
          {Categories.map((item) =>
            item.parntCateId === input.parentCategory ? (
              <option key={`selCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
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
          htmlContent={input.content}
        />
      </div>
      <div className="FilesWrap">
        <FilesLabel>Thumbnail</FilesLabel>
        <Thumbnail src={input.imageUrl} />
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>
      <div className="FilesWrap">
        <FilesLabel>Attach</FilesLabel>
        <input type="file" onChange={handleAttach} />
        {input.fileUrlList.map((item) => (
          <a href={`attach${item.index}`}>{item}</a> // eslint 문법에 맞게 수정 필요
        ))}
      </div>
      <Button onClick={submitPost} text="작성완료" />
    </form>
  );
}
export default CreatePost;
