import styled from 'styled-components';
import { useState } from 'react';
import PageGrid from '../../Common/PageGrid';
import Categories from '../../Common/Categories';
import AuthButton from './AuthButton';
import Select from '../../Common/Select';

const SelectBoxCol = styled.div`
  display: flex;
  margin: 0 30px;
`;

function PostList() {
  const [input, setInput] = useState({
    category: '000101',
    parentCategory: '0001',
    title: '',
    content: '',
    imageUrl: '',
    fileUrlList: []
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  };

  console.log('소분류: ', input.category);
  console.log('대분류: ', input.parentCategory);
  return (
    <>
      <SelectBoxCol>
        <Select
          key="selParentCategory"
          name="parentCategory"
          onChange={onChange}
          value={input.parentCategory}
        >
          {Categories.map((item) =>
            item.parntCateId === '00' ? (
              <option key={`selParentCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
        <Select key="selCategory" name="category" onChange={onChange} value={input.category}>
          {Categories.map((item) =>
            item.parntCateId === input.parentCategory ? (
              <option key={`selCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
      </SelectBoxCol>
      <PageGrid parCategory={input.parentCategory} category={input.category} page={0} size={6} />
      <AuthButton />
    </>
  );
}

export default PostList;
