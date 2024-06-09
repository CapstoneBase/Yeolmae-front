import styled from 'styled-components';

const OPTIONS = [
  { value: 'cat1', name: '카테고리1' },
  { value: 'cat2', name: '카테고리2' },
  { value: 'cat3', name: '카테고리3' }
];

const Select = styled.select`
  border: none;
  outline: none;
  color: black;
  font-size: 15px;
  background-color: inherit;
  padding: 14px 16px;
  margin: 0;

  option {
    // background-color: white;
    // padding: 10px;
    // margin: 10px;
  }
  .select-selected:after {
    position: absolute;
    content: '';
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }
`;

function SelectBox() {
  return (
    <Select>
      <option value="0">카테고리 선택</option>
      <option value="1">대분류 1</option>
      <option value="2">대분류 2</option>
    </Select>
  );
}

export default SelectBox;
