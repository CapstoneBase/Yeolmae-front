import React, { ReactChild, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import QuillEditor from './QuillEditor';
// import axios from '../hooks/useAxios';
// import Categories from '../../Common/Categories';
import Button from '../../Common/Button';
import './createPostStyle.css';
import { uploadImage } from '../../../api/uploadImage';

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

const Thumbnail = styled.img`
  max-width:128px;
  max-height:128px;
`;

const Select = styled.select`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  border: none;
  outline: none;
  color: black;
  font-size: 15px;
  background-color: inherit;
  padding: 14px 16px;
  margin: 0;

  option {
    // background-color: white;
    // padding: 10px;
    // margin: 10px;
  }
  .select-selected:after {
    position: absolute;
    content: '';
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;

const categories = [
    { "cateId": "0001", "cateName": "인문학", "parntCateId": "00" }
  , { "cateId": "0002", "cateName": "사회과학", "parntCateId": "00" }
  , { "cateId": "0003", "cateName": "자연과학", "parntCateId": "00" }
  , { "cateId": "0004", "cateName": "공학", "parntCateId": "00" }
  , { "cateId": "0005", "cateName": "예술체육학", "parntCateId": "00" }
  , { "cateId": "0006", "cateName": "기타", "parntCateId": "00" }
  , { "cateId": "000101", "cateName": "인문학일반", "parntCateId": "0001" }
  , { "cateId": "000102", "cateName": "역사학", "parntCateId": "0001" }
  , { "cateId": "000103", "cateName": "철학", "parntCateId": "0001" }
  , { "cateId": "000104", "cateName": "종교학/신학", "parntCateId": "0001" }
  , { "cateId": "000105", "cateName": "언어학", "parntCateId": "0001" }
  , { "cateId": "000106", "cateName": "문학", "parntCateId": "0001" }
  , { "cateId": "000107", "cateName": "한국어문학", "parntCateId": "0001" }
  , { "cateId": "000108", "cateName": "중국어문학", "parntCateId": "0001" }
  , { "cateId": "000109", "cateName": "일본어문학", "parntCateId": "0001" }
  , { "cateId": "000110", "cateName": "영어문학", "parntCateId": "0001" }
  , { "cateId": "000111", "cateName": "프랑스어문학", "parntCateId": "0001" }
  , { "cateId": "000112", "cateName": "독일어문학", "parntCateId": "0001" }
  , { "cateId": "000113", "cateName": "러시아어문학", "parntCateId": "0001" }
  , { "cateId": "000201", "cateName": "사회과학일반", "parntCateId": "0002" }
  , { "cateId": "000202", "cateName": "정치외교학", "parntCateId": "0002" }
  , { "cateId": "000203", "cateName": "경제학", "parntCateId": "0002" }
  , { "cateId": "000204", "cateName": "경영학", "parntCateId": "0002" }
  , { "cateId": "000205", "cateName": "무역학", "parntCateId": "0002" }
  , { "cateId": "000206", "cateName": "사회학", "parntCateId": "0002" }
  , { "cateId": "000207", "cateName": "사회복지학", "parntCateId": "0002" }
  , { "cateId": "000208", "cateName": "지역학", "parntCateId": "0002" }
  , { "cateId": "000209", "cateName": "교육학", "parntCateId": "0002" }
  , { "cateId": "000210", "cateName": "법학", "parntCateId": "0002" }
  , { "cateId": "000211", "cateName": "행정학", "parntCateId": "0002" }
  , { "cateId": "000212", "cateName": "지리/지역개발학", "parntCateId": "0002" }
  , { "cateId": "000213", "cateName": "관광학", "parntCateId": "0002" }
  , { "cateId": "000214", "cateName": "신문방송학", "parntCateId": "0002" }
  , { "cateId": "000215", "cateName": "군사학", "parntCateId": "0002" }
  , { "cateId": "000216", "cateName": "심리과학", "parntCateId": "0002" }
  , { "cateId": "000217", "cateName": "문헌정보학", "parntCateId": "0002" }
  , { "cateId": "000301", "cateName": "자연과학일반", "parntCateId": "0003" }
  , { "cateId": "000302", "cateName": "수학/통계학", "parntCateId": "0003" }
  , { "cateId": "000303", "cateName": "물리학", "parntCateId": "0003" }
  , { "cateId": "000304", "cateName": "생물학", "parntCateId": "0003" }
  , { "cateId": "000305", "cateName": "천문/지구과학", "parntCateId": "0003" }
  , { "cateId": "000306", "cateName": "생활과학", "parntCateId": "0003" }
  , { "cateId": "000401", "cateName": "공학일반", "parntCateId": "0004" }
  , { "cateId": "000402", "cateName": "기계공학", "parntCateId": "0004" }
  , { "cateId": "000403", "cateName": "항공우주공학", "parntCateId": "0004" }
  , { "cateId": "000404", "cateName": "컴퓨터학", "parntCateId": "0004" }
  , { "cateId": "000405", "cateName": "화학/생물공학", "parntCateId": "0004" }
  , { "cateId": "000406", "cateName": "전기/제어계측공학", "parntCateId": "0004" }
  , { "cateId": "000407", "cateName": "토목/환경공학", "parntCateId": "0004" }
  , { "cateId": "000408", "cateName": "전자/정보통신공학", "parntCateId": "0004" }
  , { "cateId": "000409", "cateName": "건축공학", "parntCateId": "0004" }
  , { "cateId": "000410", "cateName": "산업공학", "parntCateId": "0004" }
  , { "cateId": "000411", "cateName": "조선/해양공학", "parntCateId": "0004" }
  , { "cateId": "000412", "cateName": "자원/재료공학", "parntCateId": "0004" }
  , { "cateId": "000501", "cateName": "예술체육학일반", "parntCateId": "0005" }
  , { "cateId": "000502", "cateName": "음악", "parntCateId": "0005" }
  , { "cateId": "000503", "cateName": "미술", "parntCateId": "0005" }
  , { "cateId": "000504", "cateName": "디자인", "parntCateId": "0005" }
  , { "cateId": "000505", "cateName": "의상", "parntCateId": "0005" }
  , { "cateId": "000506", "cateName": "사진", "parntCateId": "0005" }
  , { "cateId": "000507", "cateName": "미용", "parntCateId": "0005" }
  , { "cateId": "000508", "cateName": "연극", "parntCateId": "0005" }
  , { "cateId": "000509", "cateName": "영화", "parntCateId": "0005" }
  , { "cateId": "000510", "cateName": "체육", "parntCateId": "0005" }
  , { "cateId": "000511", "cateName": "무용", "parntCateId": "0005" }
  , { "cateId": "000601", "cateName": "의약학", "parntCateId": "0006" }
  , { "cateId": "000602", "cateName": "농수해양학", "parntCateId": "0006" }
  , { "cateId": "000603", "cateName": "교육", "parntCateId": "0006" }
  , { "cateId": "000604", "cateName": "과학기술학/기술정책", "parntCateId": "0006" }
  , { "cateId": "000605", "cateName": "여성학", "parntCateId": "0006" }
  , { "cateId": "000606", "cateName": "뇌/인지과학", "parntCateId": "0006" }
  , { "cateId": "000607", "cateName": "학제간연구", "parntCateId": "0006" }  
]

const imageServer = "http://13.124.45.191:8080";  // 이미지 서버 URL

function CreatePost() {
  const refreshToken = localStorage.getItem('refreshToken');
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  const [input, setInput] = useState({
      category      : '000101'  // Default. 인문학일반(000101)
    , parentCategory: '0001'    // Default. 인문학(0001)
    , title         : ''
    , content       : ''
    , imageUrl      : ''
  });

  const onChange = (e) => {
    setInput({
      ...input,
      content:quillRef.current.editor.root.innerHTML,
      [e.target.name]: e.target.value
    });
  };

  /* const { resetBoard } = useState();
  // effect : 마운트 시 실행할 함수
  useEffect(() => {
    resetBoard();
  }, []); */

  const navigate = useNavigate();

  const hndlImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기
    formData.append('multipartFile', file);

    // 폼데이터를 서버에 넘겨 multer로 이미지 URL 받아오기
    const res = await uploadImage(formData);
    if (res.length == 0 || !res[0].fileUrl ) {
      alert('이미지 업로드에 실패하였습니다.');
    }

    const imageUrl   = `${imageServer}${res[0].fileUrl}`;
    setInput({
      ...input,
      imageUrl
    })
  };

  const submitPost = (e) => {
    e.preventDefault();

    if (!input.title) {
      return alert('제목을 입력해주세요.');
    }

    input.content = quillRef.current.getEditor().getText(); //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
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
    // const postId = document.location.href.split('?');
    // body.append('postId', postId);

    axios
      .post('/api/v1/posts', body, { headers: { Authorization   : `Bearer ${refreshToken}` } })
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
    <div className="Wrapper">
      <BoardWrapper>
        <div className="SelectboxContainer">
          <Select key={`selParentCategory`} name="parentCategory" onChange={onChange} value={input.parentCategory}>
            {categories.map(item => (
              (item.parntCateId === '00') ? <option key={`selParentCategory${item.cateId}`} value={item.cateId}>{item.cateName}</option> : null
            ))}
          </Select>
          <Select key={`selCategory`} name="category" onChange={onChange} value={input.category}>
            {categories.map(item => (
              (item.parntCateId === input.parentCategory) ? <option key={`selCategory${item.cateId}`} value={item.cateId}>{item.cateName}</option> : null
            ))}
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
        <Thumbnail src={input.imageUrl}/>
        <input type="file" accept="image/*" onChange={hndlImage}/>
        <Button onClick={submitPost} text="작성완료" />
      </BoardWrapper>
    </div>
  );
}
export default CreatePost;
