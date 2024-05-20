import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  max-width: 300px;
  margin: 20px;
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

const PostAuthor = styled.h5`
  margin: 10px;
`;

const PostDate = styled(PostAuthor)``;

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
