// UsersTab.jsx
import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const usersPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Users UseEffect is running!");
        await dispatch(fetchUserData(jwtToken, currentPage));
        setLoading(false); // Update loading state after data is fetched
      } catch (error) {
        console.error("Error fetching users data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };
    fetchData();
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
    loading ? "Loading..." :
    <ListPage
      data={currentUsers}
      listItem={listItem}
      currentPage={currentPage + 1}
      totalPages={totalPages}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    /> 
  );
};

export default UsersTab;
