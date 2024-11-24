import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';

const PaginationCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // 페이지수 리스트
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: auto;
    padding: 0px;
  }

  // 각 페이지 요소
  li {
    list-style: none;
    align-self: center;
  }

  // 각 페이지 이동
  a {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 3px 10px;
    margin: 0px -1px;
    cursor: pointer;
    border: 2px solid #dee2e6;
    align-items: center;
    color: #9266cc;
    background-color: white;

    &:hover {
      background-color: #ddd;
    }
  }

  .active a {
    color: white;
    background-color: #9266cc;
    border: 2px solid #9266cc;
  }

  .previous a {
    border-radius: 7px 0px 0px 7px;
  }

  // 이전, 이후 선택 불가능시 스타일
  .previous.disabled a {
    cursor: default;
    color: #ddd;

    &:hover {
      background-color: initial;
    }
  }

  .next a {
    border-radius: 0px 7px 7px 0px;
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
        forcePage={currentPage}
        pageLinkClassName="pagination"
        activeClassName="active"
      />
    </PaginationCol>
  );
}

export default Paginate;
