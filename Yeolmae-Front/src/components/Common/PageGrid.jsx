import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import createApiRequest from '../../api/getPostList';

// function PageGrid({ parCategory, category, page, size }) {
function PageGrid({ endpoint, parCategory, category, page, size }) {
  const [posts, setPosts] = useState([]);
  const [numOfElements, setNumOfElements] = useState([]);
  const [numOfTotalElements, setTotalElements] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const params = {
          parCategory,
          category,
          page,
          size
        };
        const { content, numberOfElements, totalElements } = await createApiRequest(
          endpoint,
          params
        );
        console.log('endpoint:', endpoint);
        console.log('content(posts):', content);
        console.log('number of elements:', numberOfElements);
        console.log('number of total elements:', totalElements);
        setPosts(content);
        setNumOfElements(numberOfElements);
        setTotalElements(totalElements);
        // return data;
      } catch (error) {
        console.log('Error:', error);
        // throw error;
      }
    };
    getData();
  }, [endpoint, parCategory, category, page, size]);

  // console.log(posts);
  return (
    <div className="row row-cols-1 row-col-sm-2 row-cols-md-3 row-cols-lg-4 g-2 m-5 p-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PageGrid;
