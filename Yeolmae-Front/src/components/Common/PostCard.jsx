import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';
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

  const postId = post.id;
  console.log(postId);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/postPage');
  };

  // 게시글 호출 API, 게시글 카드 컴포넌트마다 매핑
  const API = `api/v1/posts/${postId}?includeDeleted=false`;
  return (
    // 온클릭으로 페이지 이동 구현 후 Card 태그 교체
    // <Card onClick="{/* 게시글 본문 호출 API */}">
    <Card onClick={handleClick}>
      <ThumbnailBox>
        {!post.imageUrl ? <Thumbnail src="..\main_logo.PNG" /> : <Thumbnail src={post.imageUrl} />}
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
