import React from "react";
import { Link } from "react-router-dom";
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
  add = false
}) => {
  return (
    <div>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handlePageChange={handlePageChange}
      />
      {add &&
        <div className="field">
          <Link to="/home/cars/add">
          <button className="button is-primary">
            Add New Car
          </button>
          </Link>
        </div>}
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
