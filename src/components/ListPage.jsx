import React from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "./Search";
import '../Screens/MainPage.css';


const ListPage = ({
  data,
  listItem,
  currentPage,
  totalPages,
  itemCount,
  searchQuery,
  setSearchQuery,
  handlePageChange,
  handleSearch,
  add = false,
  searchable = false
}) => {
  return (
    <div>
      {searchable &&
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handlePageChange={handlePageChange}
        handleSearch={handleSearch}
      />}
      {add &&
        <div className="field">
          <Link to="/home/cars/add">
          <button className="button is-carly is-fullwidth">
            Add
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
        itemCount={itemCount}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default ListPage;
