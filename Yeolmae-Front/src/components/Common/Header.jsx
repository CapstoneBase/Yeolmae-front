import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_TOKEN } from '../../redux/modules/authSlice';
import { useAuth } from '../hooks/useAuth';

function Header() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const loginStatus = useSelector((state) => state.auth.SET_TOKEN);

  // const handleLogout = () => {
  //   dispatch(DELETE_TOKEN());
  // };

  const { logout } = useAuth();
  const handleClick = () => {
    console.log(authenticated);
    if (authenticated) {
      logout();
      console.log(authenticated);
    } else {
      navigate('/login');
    }
  };
  return (
    // 클래스이름 수정 필요
    <header className="p-3 bg-light bg-opacity-75 border-bottom">
      <div className="container">
        <div className="row">
          <div className="d-flex align-items-center justify-content-between">
            <a
              href="/"
              className="d-flex mb-2 mb-lg-0 align-items-center text-dark text-decoration-none"
            >
              <img src="/main_logo.PNG" alt="Logo" width="60" height="32" />
            </a>

            <ul className="nav col-auto me-lg-auto mb-2 mb-md-0 justify-content-start">
              <li>
                <a href="/postlist/grad" className="nav-link px-2 text-dark">
                  졸업작품
                </a>
              </li>
              <li>
                <a href="/postlist/other" className="nav-link px-2 text-dark">
                  개인 프로젝트
                </a>
              </li>
              <li>
                <a href="/postlist/cont" className="nav-link px-2 text-dark">
                  대회 및 공모전
                </a>
              </li>
            </ul>

            <ul className="nav col-auto ms-lg-auto mb-2 mb-md-0 justify-content-end">
              {/* <li>
                <a href="/portfolioPage" className="nav-link px-2 text-dark">
                  포트폴리오
                </a>
              </li>
              <li>
                <a href="/profilePage" className="nav-link px-2 text-dark">
                  {authenticated ? '마이프로필' : ''}
                </a>
              </li> */}

              {authenticated ? (
                <>
                  <li>
                    <a href="/portfolio" className="nav-link px-2 text-dark">
                      포트폴리오
                    </a>
                  </li>
                  <li>
                    <a href="/profile" className="nav-link px-2 text-dark">
                      마이프로필
                    </a>
                  </li>
                </>
              ) : (
                ''
              )}
              <li>
                {/* <a className="nav-link px-2 text-dark" onClick={handleClick}>
                  {authenticated ? '로그아웃' : '로그인'}
                </a> */}
                {authenticated ? (
                  <a href="/" className="nav-link px-2 text-dark" onClick={handleClick}>
                    로그아웃
                  </a>
                ) : (
                  <a href="/login" className="nav-link px-2 text-dark" onClick={handleClick}>
                    로그인
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
