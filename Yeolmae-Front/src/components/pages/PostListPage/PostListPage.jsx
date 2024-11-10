import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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
  // 메인 페이지에서 선택한 카테고리 항목 상태를 받아온다
  const location = useLocation();
  const sessionData = sessionStorage.getItem('selectedCategory');
  const cateData = JSON.parse(sessionData);
  // console.log(cateData, curCategory);
  // const cateInit = { ...location.state };

  // 카테고리 초기 상태를 받아온 상태로 설정한다
  const [curCategory, setCurCategory] = useState({
    parntCateId: `${cateData.parntCateId}`,
    // parntCateName: `${cateData.parntCateName}`,
    childCateId: `${cateData.childCateId}`
    // childCateName: `${cateData.childCateName}`
  });
  console.log('초기 카테고리 세션: ', cateData);
  console.log('카테고리 상태: ', curCategory);

  useEffect(() => {
    sessionStorage.setItem(
      'selectedCategory',
      JSON.stringify({
        parntCateId: `${curCategory.parntCateId}`,
        // parntCateName: `${curCategory.parntCateName}`,
        childCateId: `${curCategory.childCateId}`,
        childCateName: `${curCategory.childCateName}`
      })
    );
    console.log('변경된 카테고리: ', JSON.stringify(curCategory));
    // console.log(sessionData);
  }, [curCategory]);

  const [curPage, setCurPage] = useState(0);
  const [pageSize] = useState(8);
  // totalItems 실제 데이터에 따라 변경 필요
  const totalItems = 30;
  // console.log(curCategory);

  // 페이지 이동 시 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [curPage]);

  const handleCatChange = (e) => {
    if (e.target.name === 'parentCategory') {
      console.log('대분류 변경');
      setCurCategory({
        ...curCategory,
        parntCateId: e.target.value,
        childCateId: `${e.target.value}01`
      });
    }
    if (e.target.name === 'category') {
      console.log('소분류 변경');
      setCurCategory({
        ...curCategory,
        childCateId: e.target.value
      });
    }
    console.log(curCategory);
    // 카테고리 변경시 첫번째 페이지로 이동
    setCurPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurPage(selected);
  };

  console.log(
    '소분류: ',
    curCategory.childCateId,
    '대분류: ',
    curCategory.parntCateId,
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
          value={curCategory.parentCategory}
        >
          {Categories.map((item) =>
            item.parntCateId === '00' ? (
              <option key={`selParentCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
        <Select
          key="selCategory"
          name="childCategory"
          onChange={handleCatChange}
          value={curCategory.category}
        >
          {Categories.map((item) =>
            item.parntCateId === curCategory.parntCateId ? (
              <option key={`selCategory${item.cateId}`} value={item.cateId}>
                {item.cateName}
              </option>
            ) : null
          )}
        </Select>
      </SelectBoxCol>
      <PageGrid
        parCategory={curCategory.parntCateId}
        category={curCategory.childCateId}
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
