import { useState } from 'react';
import styled from 'styled-components';

const DropdownBtn = styled.button`
  height: 90px;
  width: 90px;
  border: none;
  outline: none;
  color: black;
  font-size: 15px;
  background-color: inherit;
  padding: 14px 16px;
  margin: 0;

  &:hover {
    background-color: #ddd;
  }
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: ${(props) => (props.displayDropdownContent ? '160px' : '0')};
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  background-color: white;
  min-width: 160px;

  ${Dropdown}:hover & {
    display: block;
  }
`;

const DropContentitem = styled.a`
  display: block;
  padding: 10px 10px;

  &:hover {
    background-color: #ddd;
  }
`;

function CategoryDropdown() {
  const [display, setDisplay] = useState(false);

  return (
    <Dropdown display={display}>
      <DropdownBtn onMouseEnter={() => setDisplay(true)} onMouseLeave={() => setDisplay(false)}>
        대분류 1
      </DropdownBtn>
      <DropdownContent>
        <DropContentitem>소분류 1</DropContentitem>
        <DropContentitem>소분류 2</DropContentitem>
        <DropContentitem>소분류 3</DropContentitem>
      </DropdownContent>
    </Dropdown>
  );
}

export default CategoryDropdown;
