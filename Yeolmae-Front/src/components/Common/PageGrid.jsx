import { useState } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';

const GridContainer = styled.div`
  display: grid;

  margin: 0px 30px;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  place-items: center;
  place-content: space-evenly space-around;
`;

function PageGrid() {
  const [contentInfo, setContentInfo] = useState([]);

  return (
    <GridContainer>
      <PostCard info={contentInfo} />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </GridContainer>
  );
}

export default PageGrid;
