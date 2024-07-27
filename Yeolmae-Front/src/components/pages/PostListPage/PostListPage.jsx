import styled from 'styled-components';
import { useEffect, useState } from 'react';
import PageGrid from '../../Common/PageGrid';
import Categories from '../../Common/Categories';
import AuthButton from './AuthButton';
import Select from '../../Common/Select';
import Paginate from './Pagination';

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

  const [curPage, setCurPage] = useState(0);
  const [pageSize] = useState(8);
  // totalItems 실제 데이터에 따라 변경 필요
  const totalItems = 30;
  // console.log(input);

  // 페이지 이동 시 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [curPage]);

  const handleCatChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    // 카테고리 변경시 첫번째 페이지로 이동
    setCurPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurPage(selected);
  };

  console.log(
    '소분류: ',
    input.category,
    '대분류: ',
    input.parentCategory,
    '현재 페이지: ',
    curPage
  );

  return (
    <>
      <SelectBoxCol>
        <Select
          key="selParentCategory"
          name="parentCategory"
          onChange={handleCatChange}
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
        <Select key="selCategory" name="category" onChange={handleCatChange} value={input.category}>
          {Categories.map((item) =>
            item.parntCateId === input.parentCategory ? (
              <option key={`selCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
      </SelectBoxCol>
      <PageGrid
        parCategory={input.parentCategory}
        category={input.category}
        page={curPage}
        size={pageSize}
      />
      <Paginate
        pageCount={Math.ceil(totalItems / pageSize)}
        onPageChange={handlePageClick}
        currentPage={curPage}
      />
      <AuthButton />
    </>
  );
}

export default PostList;
