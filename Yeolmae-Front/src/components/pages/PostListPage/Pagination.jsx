import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const Pagination = styled.ReactPaginate``;

function Paginate({ pageCount, onPageChange, currentPage }) {
  return (
    <Pagination
      previousLabel="<"
      nextLabel=">"
      pageCount={pageCount}
      onPageChange={onPageChange}
      pageLinkClassName="pagination__link"
      activeClassName="pagenation__link__active"
    />
  );
}

export default Paginate;
