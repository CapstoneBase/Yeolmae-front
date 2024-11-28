import { useNavigate } from 'react-router-dom';

function PostCard({ postType, post }) {
  const navigate = useNavigate();

  const createdDate = new Date(post.createdAt).toLocaleDateString('ko-KR');

  const handleClick = () => {
    // 게시글 유형에 따라 url 변경
    console.log(postType);
    navigate(`/posts/${postType}/${post.postId}`);
  };

  return (
    <div className="col">
      <div className="card m-3 rounded-3" onClick={handleClick}>
        {!post.thumbnail ? (
          <img src="../main_logo.PNG" className="card-img-top" alt="..." />
        ) : (
          <img src={post.thumbnail} className="card-img-top" alt="..." />
        )}
        <div className="card-body">
          <h5 className="card-title pb-1">{post.title}</h5>
          {/* <h6 className="card-subtitle pb-3 text-body-secondary">{createdDate}</h6> */}
          <h6 className="card-subtitle mb-2 text-body-secondary">{post.authorName}</h6>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
