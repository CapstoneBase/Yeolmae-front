import { useState, useEffect, createContext, useContext } from 'react';
import PostCard from './PostCard';
import createApiRequest from '../../api/queryStrReq';

// function PageGrid({ parCategory, category, page, size }) {
function PageGrid({ endpoint, memberId, pData, page, size, mainCategory, subCategory }) {
  const [posts, setPosts] = useState([]);
  const [numOfElements, setNumOfElements] = useState([]);
  const [numOfTotalElements, setTotalElements] = useState([]);
  const [numOfTotalPages, setTotalPages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const params = {
          memberId,
          page,
          size,
          mainCategory,
          subCategory
        };
        const { content, userId, numberOfElements, totalElements, totalPages } =
          await createApiRequest(endpoint, params);
        console.log(
          'endpoint:',
          endpoint,
          '\ncontent(posts):',
          content,
          '\nnumber of elements:',
          numberOfElements,
          '\nnumber of total pages:',
          totalPages
        );
        setPosts(content);
        setNumOfElements(numberOfElements);
        setTotalElements(totalElements);
        pData.setPageData({
          totalElements,
          totalPages
        });
        setTotalPages(totalPages);
        // return data;
      } catch (error) {
        console.log('Error:', error);
        // throw error;
      }
    };
    getData();
  }, [endpoint, memberId, pData, mainCategory, subCategory, page, size]);

  // console.log(posts);
  return (
    <div className="row row-cols-1 row-col-sm-2 row-cols-md-3 row-cols-lg-4 g-2 mx-5 m-3 p-3">
      {posts.map((post) => (
        <PostCard endpoint={endpoint} key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PageGrid;
