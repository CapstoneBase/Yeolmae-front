import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../Common/Button';

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin: 50px;
`;

function AuthButton() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();
  const location = useLocation();
  const cateInit = { ...location.state };

  const handleClick = () => {
    console.log(authenticated);
    if (authenticated) {
      navigate('/posts/create', {
        state: {
          cateId: `${cateInit.cateId}`,
          cateName: `${cateInit.cateName}`,
          parntCateId: `${cateInit.parntCateId}`
        }
      });
    } else {
      navigate('/loginPage');
    }
  };
  return (
    <ButtonBox>
      <Button type="button" text="글 작성하기" onClick={handleClick} />
    </ButtonBox>
  );
}

export default AuthButton;
