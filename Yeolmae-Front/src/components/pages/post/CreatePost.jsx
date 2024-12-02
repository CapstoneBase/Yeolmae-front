import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QuillEditor from '../../Common/QuillEditor';
import Select from '../../Common/Select';
import GradCategories from '../../Common/Categories/GradCategories';
import ContCategories from '../../Common/Categories/ContCategories';
import OtherCategories from '../../Common/Categories/OtherCategories';
import { createPost } from '../../../api/index';

function CreatePost() {
  const { type } = useParams(); // 'grad', 'cont', 'other'
  const navigate = useNavigate();
  const quillRef = useRef();

  // 게시글 유형별 카테고리 매핑
  const CATEGORIES_MAP = {
    grad: GradCategories,
    cont: ContCategories,
    other: OtherCategories
  };

  // 기본 입력 필드
  const [input, setInput] = useState({
    title: '',
    description: '',
    content: '',
    mainCategory: '',
    subCategory: '',
    fileUrlList: []
  });

  // 게시글 유형별 추가 필드
  const getInitialFields = (type) => {
    if (type === 'grad') {
      return {
        school: '',
        department: '',
        goalAndUtilization: ''
      };
    }
    if (type === 'cont') {
      return {
        hostingOrganization: '',
        sponsoringOrganization: '',
        relatedWebsite: ''
      };
    }
    return {
      goalAndUtilization: ''
    };
  };
  const [additionalFields, setAdditionalFields] = useState(getInitialFields(type));

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [htmlContent, setHtmlContent] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name in input) {
      setInput((prev) => ({ ...prev, [name]: value }));
    } else {
      setAdditionalFields((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCatChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
      // 메인 카테고리가 변경되면 서브 카테고리 초기화
      subCategory: name === 'mainCategory' ? '' : prev.subCategory
    }));
  };

  const handleAttach = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setInput((prev) => ({
      ...prev,
      fileUrlList: [...(prev.fileUrlList || []), file]
    }));
  };

  const submitPost = async (e) => {
    e.preventDefault();

    if (!input.title || !htmlContent) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const formData = new FormData();

    // 기본 필드 추가
    Object.keys(input).forEach((key) => {
      if (key !== 'fileUrlList') {
        formData.append(key, input[key]);
      }
    });

    // 추가 필드 추가
    Object.entries(additionalFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // 공통 필드
    formData.append('startDate', startDate.toISOString().split('T')[0]);
    formData.append('endDate', endDate.toISOString().split('T')[0]);
    formData.append('content', htmlContent);

    // 파일 첨부
    input.fileUrlList.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    try {
      const response = await createPost(type, formData);

      if (response.status === 200) {
        const postId = response.data;
        navigate(`/posts/${type}/${postId}`);
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성 중 오류가 발생했습니다.');
    }
  };

  // renderAdditionalFields 함수 - 게시글 유형별 추가 필드 렌더링
  const renderAdditionalFields = () => {
    switch (type) {
      case 'grad':
        return (
          <>
            <Form.Group className="form-group">
              <Form.Control
                type="text"
                placeholder="학교"
                name="school"
                value={additionalFields.school}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Control
                type="text"
                placeholder="전공"
                name="department"
                value={additionalFields.department}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="프로젝트 목표 및 활용방안"
                name="goalAndUtilization"
                value={additionalFields.goalAndUtilization}
                onChange={onChange}
              />
            </Form.Group>
          </>
        );
      case 'cont':
        return (
          <>
            <Form.Group className="form-group">
              <Form.Control
                type="text"
                placeholder="주관기관"
                name="hostingOrganization"
                value={additionalFields.hostingOrganization}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Control
                type="text"
                placeholder="주최기관"
                name="sponsoringOrganization"
                value={additionalFields.sponsoringOrganization}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Control
                type="url"
                placeholder="관련 페이지 URL"
                name="relatedWebsite"
                value={additionalFields.relatedWebsite}
                onChange={onChange}
              />
            </Form.Group>
          </>
        );
      case 'other':
        return (
          <Form.Group className="form-group">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="프로젝트 목표 및 활용방안"
              name="goalAndUtilization"
              value={additionalFields.goalAndUtilization}
              onChange={onChange}
            />
          </Form.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Form className="container mt-5" onSubmit={submitPost}>
      {/* 카테고리 선택 */}
      <Form.Group className="form-group">
        <select
          className="form-select mb-3"
          name="mainCategory"
          onChange={handleCatChange}
          value={input.mainCategory}
        >
          <option value="">카테고리 선택</option>
          {type === 'cont' &&
            ContCategories.categories.map((item) => (
              <option key={`mainCat${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          {type === 'grad' &&
            GradCategories.categories.map((item) => (
              <option key={`mainCat${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
          {type === 'other' &&
            OtherCategories.categories.map((item) => (
              <option key={`mainCat${item.id}`} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>

        {/* 서브 카테고리 (졸업작품, 기타 프로젝트만) */}
        {(type === 'grad' || type === 'other') && input.mainCategory && (
          <select
            className="form-select"
            name="subCategory"
            onChange={handleCatChange}
            value={input.subCategory}
          >
            <option value="">서브 카테고리 선택</option>
            {type === 'grad' &&
              GradCategories.categories
                .find((cat) => cat.id === input.mainCategory)
                ?.subCategories.map((subCat) => (
                  <option key={`subCat${subCat.id}`} value={subCat.id}>
                    {subCat.name}
                  </option>
                ))}
            {type === 'other' &&
              OtherCategories.categories
                .find((cat) => cat.id === input.mainCategory)
                ?.subCategories.map((subCat) => (
                  <option key={`subCat${subCat.id}`} value={subCat.id}>
                    {subCat.name}
                  </option>
                ))}
          </select>
        )}
      </Form.Group>

      {/* 기본 필드 */}
      <Form.Group className="form-group">
        <Form.Control
          type="text"
          placeholder="제목"
          name="title"
          value={input.title}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="form-group">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="설명"
          name="description"
          value={input.description}
          onChange={onChange}
        />
      </Form.Group>

      {/* 게시글 유형별 추가 필드 */}
      {renderAdditionalFields()}

      {/* 날짜 선택 */}
      <Form.Group className="form-group">
        <Form.Label>{type === 'cont' ? '공모전 기간' : '프로젝트 기간'}</Form.Label>
        <Row>
          <Col>
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Col>
          <Col>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Col>
        </Row>
      </Form.Group>

      {/* 에디터 */}
      <Form.Group className="form-group">
        <QuillEditor
          quillRef={quillRef}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
        />
      </Form.Group>

      {/* 파일 첨부 */}
      <Form.Group className="form-group">
        <Form.Label>첨부 파일</Form.Label>
        <Form.Control type="file" onChange={handleAttach} />
        {input.fileUrlList?.map((file, index) => (
          <div key={index}>
            첨부 파일 {index + 1}: {file.name}
          </div>
        ))}
      </Form.Group>

      {/* 제출 버튼 */}
      <Button type="submit" className="btn btn-primary">
        작성완료
      </Button>
    </Form>
  );
}

export default CreatePost;
