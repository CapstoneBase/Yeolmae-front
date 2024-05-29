import styled from 'styled-components';

const Dropdown = styled.button``;
function CategoryDropdown() {
  return (
    <>
      <Dropdown>카테고리 설정</Dropdown>
      <div>대분류1</div>
      <div>대분류2</div>
      <div>대분류3</div>
    </>
  );
}

export default CategoryDropdown;
