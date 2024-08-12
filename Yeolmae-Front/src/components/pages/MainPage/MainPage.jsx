import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../Common/Button';
import CategoryBox from './CategoryBox';

const Container = styled.div``;

const ImageBox = styled.div`
  display: grid;
  margin: 30px 0;
  place-items: center;
  gap: 30px;
`;

function Main() {
  return (
    <Container className="container">
      <ImageBox>
        <img src="/main_logo.PNG" alt="로고이미지" height="300" />
        <CategoryBox />
      </ImageBox>
    </Container>
  );
}

export default Main;
