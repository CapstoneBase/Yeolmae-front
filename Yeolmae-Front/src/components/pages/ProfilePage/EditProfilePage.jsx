import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthButton from '../../Common/AuthButton';
import Button from '../../Common/Button';
import createApiRequest, { endpoints } from '../../../api/queryStrReq';
import ProfileInfo from './ProfileInfo';

function CustomInput({ label, ...props }) {
  return (
    <div className="row m-1 justify-content-center">
      <div className="col-2 mx-2">
        <label className="form-label">{label}</label>
      </div>
      <div className="col-4">
        <input className="form-control" {...props} />
      </div>
    </div>
  );
}

function EditProfilePage({ setUserInfo }) {
  const accessToken = localStorage.getItem('accessToken');
  const memberId = localStorage.getItem('id');
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    email: [],
    name: [],
    school: [],
    major: [],
    introduction: []
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const params = { memberId };
        const response = await createApiRequest(endpoints.INFO, params);
        setInfo(response);
        setUserInfo(response);
        console.log('memberId: ', memberId, response);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    getData();
  }, [memberId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(value);
  };

  const onSubmit = (e) => {
    console.log('수정될 정보: ', info);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createApiRequest('/members', memberId, {
      method: 'PUT',
      data: {
        name: info.name,
        school: info.school,
        major: info.major,
        introduction: info.introduction
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log('Updated user info:', info);
    navigate('/profilePage');
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await createApiRequest('/members', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log(memberId, '회원 탈퇴');
    navigate('/');
  };

  return (
    <>
      <div className="row mx-5 my-4 px-4">
        <h2>내 정보 관리</h2>
      </div>
      <div className="row m-5 px-4">
        <h4>내 정보 수정</h4>
        <CustomInput
          label="이름"
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
        <div className="row m-1 justify-content-center">
          <div className="col-2 mx-2">
            <label className="form-label">이메일</label>
          </div>
          <div className="col-4">
            <div className="row m-0">
              <input className="form-control" value={info.email} disabled readOnly />
            </div>
            <div className="col-auto">
              <span id="passwordHelpInline" className="form-text">
                이메일은 수정할 수 없습니다
              </span>
            </div>
          </div>
        </div>
        <CustomInput
          label="학교"
          type="text"
          name="school"
          value={info.school}
          onChange={handleChange}
        />
        <CustomInput
          label="전공"
          type="text"
          name="major"
          value={info.major}
          onChange={handleChange}
        />
        <div className="row m-1 justify-content-center">
          <div className="col-2 mx-2">
            <label className="form-label">자기소개</label>
          </div>
          <div className="col-4">
            <textarea
              className="form-control"
              type="text"
              name="introduction"
              value={info.introduction}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/* <div className="row mx-5 px-4">
        <h4>비밀번호 수정</h4>
      </div>
      <div>비밀번호 변경 폼</div> */}
      <div className="row d-flex mx-2 px-4 justify-content-center">
        <div className="row m-1 justify-content-center">
          <div className="col-2">
            <Button text="수정하기" onClick={handleSubmit} />
          </div>
        </div>
        <div className="row m-1 justify-content-center">
          <div className="col-2">
            <button className="btn btn-danger w-100" type="button" onClick={handleDelete}>
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
