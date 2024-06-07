import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TOKEN } from "../../redux/modules/authSlice";
import styled from "styled-components"; 

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  justify-content: center;
`;

function LoginLink() {
    const dispatch = useDispatch();
    const loginStatus = useSelector((state) => state.auth.SET_TOKEN);

    const handleLogout = () => {
        dispatch(DELETE_TOKEN());
    };

    return loginStatus ? (
        <StyledLink onClick={handleLogout} to="/">로그아웃</StyledLink>     
    ) : (
        <StyledLink to="/loginPage">로그인</StyledLink> 
    );
};

export default LoginLink;
