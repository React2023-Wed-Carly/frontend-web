import React from 'react';

const Pagination = ({currentPage, totalPages, handlePageChange}) => {
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <button
        className="pagination-previous button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="pagination-next button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <ul className="pagination-list">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <button
              className={`pagination-link button ${
                currentPage === index + 1 ? "is-current" : ""
              }`}
              aria-label={`Goto page ${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
