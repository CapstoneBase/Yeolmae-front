import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const handleClick = () => {
    console.log(authenticated);
    if (authenticated) {
      navigate('/posts/create');
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
