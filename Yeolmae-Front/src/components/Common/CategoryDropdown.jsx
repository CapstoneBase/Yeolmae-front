import styled from 'styled-components';

const DropdownBtn = styled.button``;

const Dropdown = styled.div`
  position: realtive;
  display: inline-block;
`;

const CategoryContent = styled.a``;

function CategoryDropdown() {
  return (
    <>
      <DropdownBtn>카테고리 설정</DropdownBtn>
      <Dropdown>
        <CategoryContent>대분류 1</CategoryContent>
      </Dropdown>
    </>
  );
}

export default CategoryDropdown;
