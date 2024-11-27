import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuillEditor from './QuillEditor';
import Categories from '../../Common/Categories';
import Select from '../../Common/Select';
import './createPostStyle.css';

const API_ENDPOINT = '/api/v1/contest-posts';

function CreateContPost() {
  const accessToken = localStorage.getItem('accessToken');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const quillRef = useRef();
  const [htmlContent, setHtmlContent] = useState('');
  const [input, setInput] = useState({
    title: '',
    description: '',
    content: '',
    mainCategory: '0001', // Default. 인문학(0001)
    hostingOrganization: '',
    sponsoringOrganization: '',
    relatedWebsite: '',
    fileUrlList: []
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

  const handleAttach = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setInput((prevInput) => ({
      ...prevInput,
      fileUrlList: [...(prevInput.fileUrlList || []), file]
    }));

    e.target.value = '';
    console.log('파일 추가됨:', file.name);
  };

  const submitPost = async (e) => {
    e.preventDefault();

    if (!input.title) {
      return alert('제목을 입력해주세요.');
    }

    if (!htmlContent) {
      return alert('내용을 입력해주세요.');
    }

    const body = {
      title: input.title,
      description: input.description,
      content: input.content,
      mainCategory: input.mainCategory,
      hostingOrganization: input.hostingOrganization,
      sponsoringOrganization: input.sponsoringOrganization,
      relatedWebsite: input.relatedWebsite,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };
    console.log('request body : ', body);
    const queryString = new URLSearchParams(body).toString();

    const formData = new FormData();
    input.fileUrlList.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const res = await axios.post(`${API_ENDPOINT}?${queryString}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.status === 200) {
        console.log('게시글 작성 성공');
        const postId = res.data;
        console.log('Fetched Post ID:', postId);
        if (postId) {
          navigate(`/posts/cont/${postId}`); // 해당 게시글 페이지로 이동
        } else {
          console.error('postId is undefined', res.data);
        }
      }
    } catch (err) {
      if (err.response) {
        console.error('서버 에러 응답:', err.response.data);
        alert(`업로드 실패: ${err.response.data.message || '알 수 없는 오류입니다.'}`);
      } else if (err.request) {
        console.error('요청이 전송되었으나 응답이 없습니다.', err.request);
        alert('서버로부터 응답이 없습니다. 잠시 후 다시 시도해주세요.');
      } else {
        console.error('요청 설정 중 에러 발생:', err.message);
        alert('요청 처리 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <Form className="container mt-5" onSubmit={submitPost}>
      <Form.Group className="form-group" controlId="formCategories">
        <Select
          key="selMainCategory"
          name="mainCategory"
          onChange={onChange}
          value={input.mainCategory}
        >
          {Categories.map((item) =>
            item.parntCateId === '00' ? (
              <option key={`selMainCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
      </Form.Group>
      <Form.Group className="form-group" controlId="formTitle">
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
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="설명"
          name="description"
          value={input.description}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formHostingOrganization">
        <Form.Control
          type="text"
          placeholder="주관기관"
          name="hostingOrganization"
          value={input.hostingOrganization}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formSponsoringOrganization">
        <Form.Control
          type="text"
          placeholder="주최기관"
          name="sponsoringOrganization"
          value={input.sponsoringOrganization}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formRelatedWebsite">
        <Form.Control
          type="url"
          placeholder="관련 페이지 URL"
          name="relatedWebsite"
          value={input.relatedWebsite}
          onChange={onChange}
          className="form-control"
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label>대회 기간</Form.Label>
        <Row className="align-items-center">
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Col>
          <Col>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="form-group" controlId="formContent">
        <QuillEditor
          quillRef={quillRef}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
          endpoint={API_ENDPOINT}
          queryParams={input.content}
          className="form-control quill-editor"
        />
      </Form.Group>
      <Form.Group className="form-group" controlId="formAttachments">
        <Form.Label>첨부 파일</Form.Label>
        <Form.Control type="file" onChange={handleAttach} className="form-control" />
        {input.fileUrlList?.map((file, index) => (
          <a key={index} href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
            첨부 파일 {index + 1}: {file.name}
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

export default CreateContPost;
