import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuillEditor from './QuillEditor';
import { uploadImage } from '../../../api/uploadImage';
import FilesLabel from '../../Common/FilesLabel';
import Categories from '../../Common/Categories';
import Select from '../../Common/Select';
import './createPostStyle.css';

const imageServer = 'http://54.180.77.251:8080'; // 이미지 서버 URL

function CreatePost() {
  const refreshToken = localStorage.getItem('refreshToken');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const quillRef = useRef();
  const [input, setInput] = useState({
    // category: '000101', // Default. 인문학일반(000101)
    // parentCategory: '0001', // Default. 인문학(0001)
    title: '',
    description: '',
    content: '',
    fileUrlList: [],
    school: '',
    department: '',
    goalAndUtilization: ''
  });

  const onChange = (e) => {
    setInput({
      ...input,
      content: quillRef.current.editor.root.innerHTML,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleAttach = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData(); // 파일을 URL로 바꾸기 위해 서버로 전달할 폼데이터 만들기
    formData.append('multipartFile', file);

    try {
      const res = await axios.post('YOUR_UPLOAD_URL', formData);
      if (res.data.length === 0 || !res.data[0].fileUrl) {
        alert('파일 업로드에 실패하였습니다.');
        return;
      }

      const fileUrl = `${res.data[0].fileUrl}`;
      setInput({
        ...input,
        content: quillRef.current.editor.root.innerHTML,
        fileUrlList: [...input.fileUrlList, fileUrl]
      });
      e.target.value = '';
    } catch (err) {
      console.error('파일 업로드 중 오류가 발생하였습니다.', err);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();

    if (!input.title) {
      return alert('제목을 입력해주세요.');
    }

    input.content = quillRef.current.getEditor().getContents(); // Delta 포맷으로 저장
    if (!input.content) {
      return alert('내용을 입력해주세요.');
    }

    const body = {
      title: input.title,
      description: input.description,
      content: JSON.stringify(input.content), // content를 문자열로 변환
      school: input.school,
      department: input.department,
      startDate: startDate.toISOString().slice(0, 7), // MM/YYYY 형식으로 변환
      endDate: endDate.toISOString().slice(0, 7), // MM/YYYY 형식으로 변환
      goalAndUtilization: input.goalAndUtilization,
      files: input.fileUrlList // 파일 URL 리스트 추가
    };

    try {
      const response = await axios.post('/api/v1/graduation-project-posts', body, {
        headers: {
          Authorization: `Bearer ${refreshToken}`, // Authorization 헤더 추가
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        console.log('게시글 작성 성공');
        navigate(`/postlistPage`);
      }
    } catch (err) {
      console.error(err);
      alert('게시글 업로드에 실패하였습니다.');
    }
  };

  return (
    <Form className="container mt-5" onSubmit={submitPost}>
      <Form.Group className="form-group" controlId="formTitle">
        <Form.Label>제목</Form.Label>
        <Form.Control
          type="text"
          placeholder="제목"
          name="title"
          value={input.title}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formDescription">
        <Form.Label>설명</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="설명"
          name="description"
          value={input.description}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formSchool">
        <Form.Label>학교</Form.Label>
        <Form.Control
          type="text"
          placeholder="학교"
          name="school"
          value={input.school}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formDepartment">
        <Form.Label>전공</Form.Label>
        <Form.Control
          type="text"
          placeholder="전공"
          name="department"
          value={input.department}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>

      {/* 프로젝트 기간 */}
      <Form.Group className="form-group">
        <Form.Label>프로젝트 기간</Form.Label>
        <Row className="align-items-center">
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              className="form-control"
            />
          </Col>
          <Col>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM"
              showMonthYearPicker
              className="form-control"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="form-group" controlId="formGoalAndUtilization">
        <Form.Label className="multiline-label">
          프로젝트 목표와
          <br />
          활용 방안
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="프로젝트 목표와 활용 방안"
          name="goalAndUtilization"
          value={input.goalAndUtilization}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>

      <Form.Group className="form-group" controlId="formContent">
        <Form.Label>내용</Form.Label>
        <QuillEditor
          quillRef={quillRef}
          value={input.content}
          onChange={onChange}
          className="form-control quill-editor"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formAttachments">
        <Form.Label>첨부 파일</Form.Label>
        <Form.Control type="file" onChange={handleAttach} className="form-control" />
        {input.fileUrlList.map((item, index) => (
          <a key={index} href={item}>
            첨부 파일 {index + 1}
          </a>
        ))}
      </Form.Group>
      <Form.Group className="form-group text-center">
        <Button type="submit" className="btn btn-primary">
          작성완료
        </Button>
      </Form.Group>
    </Form>
  );
}
export default CreatePost;
