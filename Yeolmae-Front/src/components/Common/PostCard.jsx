import styled from 'styled-components';

const Card = styled.div`
  background-color: white;
  max-width: 300px;
  margin: 20px;
  border: 2px solid rgb(227, 232, 237);
  border-radius: 5px;
  box-shadow: rgba(100, 100, 100, 0.1) 0px 0px 29px 0px;
`;

// const CardThumbnail = styled.image``;

const CardContents = styled.div``;

const PostTitle = styled.h4`
  margin: 10px;
`;

const PostAuthor = styled.h5`
  margin: 10px;
`;

function PostCard() {
  return (
    <Card>
      {/* <CardThumbnail /> */}
      <CardContents>
        <PostTitle>게시글제목</PostTitle>
        <PostAuthor>작성자</PostAuthor>
        <PostAuthor>2024.05.16</PostAuthor>
      </CardContents>
    </Card>
  );
}

export default PostCard;
