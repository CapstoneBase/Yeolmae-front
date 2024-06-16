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
    <StyledHeader className="Header">
      <StyledHeaderLeft>
        <StyledLink to="/">
          <img src="/IMG_4276.PNG" width={60} alt="로고이미지" />
        </StyledLink>
      </StyledHeaderLeft>
      <StyledHeaderCenter />
      <StyledHeaderRight>
        {authenticated ? (
          <StyledLink to="/" onClick={handleClick}>
            로그아웃
          </StyledLink>
        ) : (
          <StyledLink to="/loginpage" onClick={handleClick}>
            로그인
          </StyledLink>
        )}
      </StyledHeaderRight>
    </StyledHeader>
  );
}

export default Header;
