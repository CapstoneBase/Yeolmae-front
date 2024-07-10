import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';

const PaginationCol = styled.div`
  display: flex;
  justify-content: center;

  // 페이지수 리스트
  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  // 각 페이지 요소
  li {
    padding: 6px 12px;
    list-style: none;
    align-items: center;
  }

  // 각 페이지 이동
  a {
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #ddd;
    }
  }

  .selected a {
    background-color: #6558f5;
    border-radius: 3px;
    color: white;
  }

  // 이전, 이후 선택 불가능시 스타일
  .previous.disabled a {
    cursor: default;
    color: #ddd;

    &:hover {
      background-color: initial;
    }
  }

  .next.disabled a {
    cursor: default;
    color: #ddd;

    &:hover {
      background-color: initial;
    }
  }
`;

function Paginate({ pageCount, onPageChange, currentPage }) {
  return (
    <PaginationCol>
      <ReactPaginate
        previousLabel={<FaArrowLeft />}
        nextLabel={<FaArrowRight />}
        pageCount={pageCount}
        onPageChange={onPageChange}
        pageLinkClassName="pagination"
        activeClassName="selected"
      />
    </PaginationCol>
  );
}

export default Paginate;
