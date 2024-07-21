import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../Common/Button';
import CategoryDropdown from './CategoryDropdown';

const ImageBox = styled.div`
  display: grid;
  margin: auto;
  place-items: center;
  gap: 50px;

  img {
    // margin: auto;
  }
`;
const ButtonBox = styled.div`
  display: grid;
  width: 200px;
  height: 30px;
  margin: 0 200px;
  gap: 20px;
`;

const DropdownBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  // algin-content: center;
`;
function Main() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('./postlistPage');
  };
  return (
    <>
      <ImageBox>
        <img src="/main_logo.PNG" alt="로고이미지" />
        <ButtonBox>
          {/* <Button text="회원가입 하러 가기" onClick={navigate('/signupPage')} /> */}
          <Button text="게시글 둘러보러 가기" onClick={handleClick} />
        </ButtonBox>
      </ImageBox>
      <DropdownBox>
        <CategoryDropdown />
        <CategoryDropdown />
        <CategoryDropdown />
        <CategoryDropdown />
        <CategoryDropdown />
        <CategoryDropdown />
      </DropdownBox>
    </>
  );
}

export default Main;
