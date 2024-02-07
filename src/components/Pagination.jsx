import React from 'react';

const Pagination = ({currentPage, itemCount, handlePageChange}) => {
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <button
        className="pagination-next button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={itemCount === 0}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
