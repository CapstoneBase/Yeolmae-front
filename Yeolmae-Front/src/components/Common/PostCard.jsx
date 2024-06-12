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
const ThumbnailBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10%;
  width: 80%;
  height: 150px;
`;

const CardThumbnail = styled.img`
  width: 80%;
  overflow: clip;
`;

const CardContents = styled.div`
  padding: 7px;
  background-color: white;
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

function PostCard({ post }) {
  const date = new Date(post.createdAt);
  const createdDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
  console.log(createdDate);
  return (
    <Card>
      <ThumbnailBox>
        {!post.imageUrl ? (
          <CardThumbnail src="..\main_logo.PNG" />
        ) : (
          <CardThumbnail src={post.imageUrl} />
        )}
      </ThumbnailBox>
      <CardContents>
        <PostTitle>{post.title}</PostTitle>
        <PostAuthor>{post.writerName}</PostAuthor>
        <PostDate>{createdDate}</PostDate>
      </CardContents>
    </Card>
  );
}

export default PostCard;
