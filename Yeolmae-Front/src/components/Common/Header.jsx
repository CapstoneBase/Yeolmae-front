import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { DELETE_TOKEN } from '../../redux/modules/authSlice';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
`;

const StyledHeader = styled.header`
  display: flex;
  // 240728 헤더 높이 수정
  height: 40px;
  align-items: center;
  padding: 5px 15px;
  background-color: rgba(108, 108, 108, 1);
  font-family: NotoSans Regular;
  color: white;
`;

const StyledHeaderCenter = styled.div`
  width: 80%;
`;

const StyledHeaderLeft = styled.div`
  display: flex;
  width: 10%;
  justify-content: left;
`;

const StyledHeaderRight = styled.div`
  display: flex;
  width: 10%;
  justify-content: right;
`;

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
    <header className="p-3 bg-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
          >
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="#" className="nav-link px-2 text-dark">
                졸업 작품
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-dark">
                개인 프로젝트
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-dark">
                대회 및 공모전
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-dark">
                포트폴리오
              </a>
            </li>
          </ul>

          <div class="text-end">
            <button type="button" class="btn btn-outline-dark me-2">Login</button>
            <button type="button" class="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
    // <StyledHeader className="Header">
    //   <StyledHeaderLeft>
    //     <StyledLink to="/">
    //       <img src="/IMG_4276.PNG" width={60} alt="로고이미지" />
    //     </StyledLink>
    //   </StyledHeaderLeft>
    //   <StyledHeaderCenter />
    //   <StyledHeaderRight>
    //     {authenticated ? (
    //       <StyledLink to="/" onClick={handleClick}>
    //         로그아웃
    //       </StyledLink>
    //     ) : (
    //       <StyledLink to="/loginpage" onClick={handleClick}>
    //         로그인
    //       </StyledLink>
    //     )}
    //   </StyledHeaderRight>
    // </StyledHeader>
  );
}

export default Header;
