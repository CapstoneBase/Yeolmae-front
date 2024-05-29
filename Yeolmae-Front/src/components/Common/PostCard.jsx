import styled from 'styled-components';
// import Tag from './Tag';

const Card = styled.div`
  background-color: white;
  max-width: 300px;
  margin: 5px;
  border: 2px solid rgb(227, 232, 237);
  border-radius: 5px;
  box-shadow: rgba(100, 100, 100, 0.1) 0px 0px 29px 0px;
  display: flex;
  flex-direction: column;
`;

const CardThumbnail = styled.img`
  width: 80%;
`;

const CardContents = styled.div`
  padding: 7px;
`;

const PostTitle = styled.h4`
  margin: 10px;
`;

const PostAuthor = styled.div`
  margin: 10px;
  font-size: 14px;
`;

// PostAuthor 컴포넌트 상속하여 스타일 적용하기
const PostDate = styled(PostAuthor)``;

// [240520] 태그 기능 보류
// const TagWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   margin: 0 10px 0 10px;
//   overflow: hidden;
//   align-items: center;
// `;

function PostCard() {
  return (
    <Card>
      <CardThumbnail src="\IMG_4276.PNG" />
      <CardContents>
        <PostTitle>게시글제목</PostTitle>
        <PostAuthor>작성자</PostAuthor>
        <PostDate>2024.05.16</PostDate>
      </CardContents>
    </Card>
  );
}

export default PostCard;
