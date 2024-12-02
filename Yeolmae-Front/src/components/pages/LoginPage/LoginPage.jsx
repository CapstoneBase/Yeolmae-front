/* eslint-disable no-alert */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Common/Button';
import ToastNotification from '../../Common/ToastNotification';
// import { loginUser } from '../../api/loginUser';
// import { SET_TOKEN, loginThunk, reissueTokenThunk } from '../../redux/modules/authSlice';
import { loginThunk } from '../../../redux/modules/loginThunk';
import usePageTitle from '../../../hooks/usePageTitle';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  usePageTitle('로그인');
  const [toast, setToast] = useState(false);

  const idRef = useRef('');
  const pwdRef = useRef('');

  // const [input, setInput] = useState({
  //   id: '',
  //   password: ''
  // });

  const authenticated = useSelector((state) => state.auth.authenticated);

  // const [toast, setToast] = useState(false);

  useEffect(() => {
    if (authenticated) {
      console.log('메인 화면으로 이동');
      navigate('/');
    }
  }, [authenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idRef.current.value) {
      return window.alert('ID를 입력해주세요.');
    }
    if (!pwdRef.current.value) {
      return alert('비밀번호를 입력해주세요.');
    }

    // 로그인 후 비밀번호 입력값 제거
    // setInput(input.password, '');

    dispatch(loginThunk(idRef.current.value, pwdRef.current.value));
    console.log('로그인 시도');

    console.log('로그인 성공:', authenticated);
    if (authenticated) {
      console.log('메인 화면으로 이동');
      navigate('/');
    } else {
      console.log('로그인 실패');
      // navigate('/loginPage');
      setToast(true);
    }
    return null;
  };

  return (
    <div className="container-md">
      <form className="form-signin p-3 m-auto" style={{ width: '400px' }}>
        <h1 className="h2 py-4 fw-500">로그인</h1>
        <div className="form-floating my-2 mt-3">
          <input
            ref={idRef}
            type="id"
            className="form-control"
            id="floatingId"
            placeholder="아이디"
          />
          <label htmlFor="floatingId">아이디</label>
        </div>
        <div className="form-floating my-2 mb-3">
          <input
            ref={pwdRef}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="password"
          />
          <label htmlFor="floatingPassword">비밀번호</label>
        </div>
        {/* 토스트 알림으로 교체 */}
        <div className="d-flex pt-3 my-3 justify-content-center">
          <Button text="로그인" onClick={handleSubmit} />
        </div>
        <div className="d-flex my-2 justify-content-center">
          <a
            className="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
            href="/signupPage"
          >
            회원가입
          </a>
        </div>
      </form>
    </div>
    // {toast === true ? (
    //   <ToastNotification
    //     text="존재하지 않는 아이디이거나 잘못된 비밀번호입니다."
    //     props={setToast}
    //   />
    // ) : null}
  );
}

export default Login;
