import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  return (
    <StyledHeader className="Header">
      <StyledHeaderLeft>
        <StyledLink to="/">
          <img src="/IMG_4276.PNG" width={60} alt="로고이미지" />
        </StyledLink>
      </StyledHeaderLeft>
      <StyledHeaderCenter />
      <StyledHeaderRight>
        <StyledLink to="/loginpage">로그인</StyledLink>
      </StyledHeaderRight>
    </StyledHeader>
  );
}

export default Header;
