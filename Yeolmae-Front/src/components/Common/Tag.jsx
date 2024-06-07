import styled from 'styled-components';
import { HiOutlineHashtag } from 'react-icons/hi';

const StlyedTag = styled.div`
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: white;
  padding: 0 8px;
  border-radius: 15px;
  margin: 0 8px 8px 0;
  background-color: #6558f5;
  text-wrap: nowrap;
`;

function Tag({ text }) {
  return (
    <StlyedTag>
      <HiOutlineHashtag />
      {text}
    </StlyedTag>
  );
}

export default Tag;
