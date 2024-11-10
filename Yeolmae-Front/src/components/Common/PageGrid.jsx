import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { getPostList } from '../../api/getPostList';

const GridContainer = styled.div`
  display: grid;

  min-height: 500px;
  max-height: 1000px;
  margin: 0px 40px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1px;
  place-items: top;
  place-content: space-evenly space-around;
`;

function PageGrid({ parCategory, category, page, size }) {
  const [posts, setPosts] = useState([]);
  const [totItems, setTotItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPostList({ parCategory, category, page, size });
        setPosts(data.items);
        setTotItems(data.totalItems);
        // return data;
        // console.log('Data:', data);
      } catch (error) {
        console.log('Error:', error);
        // throw error;
      }
    };
    getData();
  }, [parCategory, category, page, size]);

  // console.log(posts);
  return (
    <GridContainer>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </GridContainer>
  );
}

export default PageGrid;
