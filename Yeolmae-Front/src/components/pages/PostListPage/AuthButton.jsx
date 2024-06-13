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
      navigate('/createPost');
    } else {
      navigate('/loginPage');
    }
  };
  return (
    <ButtonBox>
      <Button
        type="button"
        text={authenticated ? '글 작성하기' : '로그인하기'}
        onClick={handleClick}
      />
    </ButtonBox>
  );
}

export default AuthButton;
