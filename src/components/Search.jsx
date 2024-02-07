import React from "react";

const Search = ({ searchQuery, setSearchQuery, handlePageChange, handleSearch }) => {
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          className="input"
          type="number"
          min="1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter id"
        />
      </div>
      <div className="control">
        <button className="button is-info" onClick={() => handleSearch(searchQuery)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
