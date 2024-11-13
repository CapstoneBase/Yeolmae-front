import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_TOKEN } from '../../redux/modules/authSlice';

function Header() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const loginStatus = useSelector((state) => state.auth.SET_TOKEN);

  // const handleLogout = () => {
  //   dispatch(DELETE_TOKEN());
  // };

  const handleClick = () => {
    console.log(authenticated);
    if (authenticated) {
      dispatch(DELETE_TOKEN());
      navigate('/');
      console.log(authenticated);
    } else {
      navigate('/loginPage');
    }
  };
  return (
    // 클래스이름 수정 필요
    <header className="p-3 bg-light bg-opacity-75 border-bottom">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <img src="/main_logo.PNG" alt="Logo" width="60" height="32" />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="/postlistPage" className="nav-link px-2 text-dark">
                졸업 작품
              </a>
            </li>
            <li>
              <a href="/postlistPage" className="nav-link px-2 text-dark">
                개인 프로젝트
              </a>
            </li>
            <li>
              <a href="/postlistPage" className="nav-link px-2 text-dark">
                대회 및 공모전
              </a>
            </li>
            <li>
              <a href="/portfolioPage" className="nav-link px-2 text-dark">
                포트폴리오
              </a>
            </li>
          </ul>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          {/* <ul className="nav"> */}
            <li>
              <a href="/myPage" className="nav-link px-2 text-dark">
                마이페이지
              </a>
            </li>
            <li>
              {authenticated ? (
                <a href="/" className="nav-link px-2 text-dark" onClick={handleClick}>
                  로그아웃
                </a>
              ) : (
                <a href="/loginPage" className="nav-link px-2 text-dark" onClick={handleClick}>
                  로그인
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
