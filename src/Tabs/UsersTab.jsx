// UsersTab.jsx
import React, { useState, useEffect } from "react";
import data from "../DummyData.json";
import { Link } from "react-router-dom";
import "./UsersTab.css";
import ListPage from "../components/ListPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData  } from '../redux/thunks';

const UsersTab = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 20;

  useEffect(() => {
    // Fetch user data when the component mounts
    console.log("UseEffect is running!")
    dispatch(fetchUserData(jwtToken, currentPage));
  }, [dispatch, jwtToken, currentPage]);

  const filteredUsers = users;

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage) * usersPerPage,
    (currentPage + 1) * usersPerPage
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
