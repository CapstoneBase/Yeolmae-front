import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageGrid from '../../Common/PageGrid';
import OtherCategories from '../../Common/Categories/OtherCategories';
import Button from '../../Common/Button';
import AuthButton from '../../Common/AuthButton';
import Select from '../../Common/Select';
import Paginate from '../../Common/Pagination';
import { endpoints } from '../../../api/queryStrReq';

function OtherPostList() {
  const location = useLocation();

  // 카테고리 초기 상태를 받아온 상태로 설정한다
  const [input, setInput] = useState({
    mainCategory: OtherCategories.categories[0].id,
    subCategory: OtherCategories.categories[0].subCategories[0].id
  });

  const [curPage, setCurPage] = useState(0);
  const [pageSize] = useState(12);
  // totalItems 실제 데이터에 따라 변경 필요
  const [pageData, setPageData] = useState({
    totalElements: 0,
    totalPages: 0
  });
  // console.log(input);

  // 페이지 이동 시 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [curPage]);

  const handleCatChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      if (name === 'mainCategory') {
        // 메인 카테고리가 변경되면 해당 카테고리의 첫 번째 서브 카테고리로 설정
        const firstSubCategory = OtherCategories.categories.find((cat) => cat.id === value)
          ?.subCategories[0].id;
        return {
          ...prev,
          [name]: value,
          subCategory: firstSubCategory
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });
    setCurPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurPage(selected);
  };

  console.log(
    '메인 카테고리: ',
    input.mainCategory,
    '\n서브 카테고리: ',
    input.subCategory,
    '\n현재 페이지: ',
    curPage
  );

  return (
    <>
      <div className="row mx-5 my-4 px-4">
        <h2>개인 프로젝트</h2>
      </div>
      <div className="row m-5 px-4 justify-content-between">
        <div className="d-flex gap-3 col-lg-4 col-md-8 col-sm-8">
          <select
            className="form-select"
            key="selMainCategory"
            name="mainCategory"
            onChange={handleCatChange}
            value={input.mainCategory}
          >
            {OtherCategories.type === '02'
              ? OtherCategories.categories.map((item) => (
                  // type이 01인지 확인
                  <option key={`selMainCategory${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))
              : null}
          </select>
          <select
            className="form-select"
            key="selSubCategory"
            name="subCategory"
            onChange={handleCatChange}
            value={input.subCategory}
          >
            {input.mainCategory
              ? OtherCategories.categories
                  .find((cat) => cat.id === input.mainCategory)
                  ?.subCategories.map((item) => (
                    <option key={`selSubCategory${item.id}`} value={item.id}>
                      {item.name}
                    </option>
                  ))
              : null}
          </select>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="검색 키워드를 입력해주세요" />
            <button type="submit" className="btn btn-primary">
              검색
            </button>
          </div>
        </div>
      </div>

      <PageGrid
        endpoint={endpoints.OTHER}
        setPageData={setPageData}
        mainCategory={input.mainCategory}
        subCategory={input.subCategory}
        page={curPage}
        size={pageSize}
      />
      <div className="row align-items-center">
        <div className="col-3" />
        <div className="col-6 d-flex justify-content-center align-items-center">
          <Paginate
            pageCount={pageData.totalPages}
            onPageChange={handlePageClick}
            currentPage={curPage}
          />
        </div>
        <div className="col-2 d-flex justify-content-end px-5">
          <AuthButton text="글 작성하기" destination="/posts/create" curstate={input} />
        </div>
      </div>
    </>
  );
}

export default OtherPostList;
