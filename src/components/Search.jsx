import React from "react";

const Search = ({ searchQuery, setSearchQuery, handlePageChange }) => {
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          className="input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter id"
        />
      </div>
      <div className="control">
        <button className="button is-info" onClick={() => handlePageChange(1)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
