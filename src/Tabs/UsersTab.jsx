// UsersTab.jsx
import React, { useState } from "react";
import data from "../DummyData.json";
import { Link } from "react-router-dom";
import "./UsersTab.css";
import ListPage from "../components/ListPage";

const UsersTab = () => {
  const users = data.users;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = users;

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = (item) => {
    return (
      <div key={item.id} className="list-element">
        <Link to={`/home/users/${item.id}`}>
          <p>{item.id} {item.firstName} {item.lastName}</p>
        </Link>
      </div>
    );
  };

  return (
    <ListPage
      data={currentUsers}
      listItem={listItem}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    />
  );
};

export default UsersTab;
