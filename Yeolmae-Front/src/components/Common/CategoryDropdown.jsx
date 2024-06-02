import styled from 'styled-components';

const DropdownBtn = styled.button`
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
`;

const DropdownContent = styled.div`
  position: realtive;
  display: none;
  position: absolute;
  z-index: 1;
  background-color: white;
  min-width: 160px;
  // magin: 0 0 0 10px;

  ${Dropdown}:hover & {
    display: block;
  }
`;

const DropContentitem = styled.a`
  display: block;
  // color: #9b9b9b;
  padding: 10px 10px;

  &:hover {
    // color: black;
    background-color: #ddd;
  }
`;

function CategoryDropdown() {
  return (
    <Dropdown>
      <DropdownBtn>카테고리 설정</DropdownBtn>
      <DropdownContent>
        <DropContentitem>대분류 1</DropContentitem>
        <DropContentitem>대분류 2</DropContentitem>
        <DropContentitem>대분류 3</DropContentitem>
      </DropdownContent>
    </Dropdown>
  );
}

export default CategoryDropdown;
