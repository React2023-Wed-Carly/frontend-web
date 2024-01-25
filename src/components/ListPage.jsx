import React from "react";
import Pagination from "./Pagination";
import Search from "./Search";

const ListPage = ({
  data,
  listItem,
  currentPage,
  totalPages,
  searchQuery,
  setSearchQuery,
  handlePageChange,
}) => {
  return (
    <div>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handlePageChange={handlePageChange}
      />
      <div>
        {data.map((item) => (
          listItem(item)
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ListPage;
