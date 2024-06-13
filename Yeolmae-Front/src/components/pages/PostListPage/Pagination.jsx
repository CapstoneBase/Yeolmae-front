import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const PaginationCol = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;

  ul {
    list-style: none;
    display: flex;
    list-style: none;
    padding: 0;
    align-items: center;

    li {
      padding: 2px;
      margin: 4px;
      list-style: none;
      display: inline;
      align-items: center;

      a.pagination {
        border: 3px 2px solid #F5F5F5;
        padding: 2px;
        margin: 4px;
        color: #6558f5;
        cursor: pointer;

        &:hover {
          background-color: #6558F5;
          border: 3px 2px solid #6558F5;
          border-radius: 100px;
          color: white;
        }

        &.selected {
          background-color: #6558f5;
          color: white;
        }
      }
    }
  }
`;

function Paginate({ pageCount, onPageChange, currentPage }) {
  return (
    <PaginationCol>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={pageCount}
        onPageChange={onPageChange}
        pageLinkClassName="pagination"
        activeClassName="selected"
      />
    </PaginationCol>
  );
}

export default Paginate;
