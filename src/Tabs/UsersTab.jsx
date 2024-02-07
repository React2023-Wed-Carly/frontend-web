// UsersTab.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UsersTab.css";
import ListPage from "../components/ListPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, fetchUserDataById  } from '../redux/thunks';
import { Nickname } from "../utils";

const UsersTab = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("Users UseEffect is running!");
        await dispatch(fetchUserData(jwtToken, currentPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, jwtToken, currentPage]);

  const currentUsers = users;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  const handleSearch = () => {
    try {
      if( searchQuery !== "") {
      dispatch(fetchUserDataById(jwtToken, searchQuery));
      } else {
        dispatch(fetchUserData(jwtToken, currentPage));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const listItem = (item) => {
    return (
      <div key={item.id} className="list-element">
        <Link to={`/home/users/${item.id}`}>
          <Nickname  username={item.username}/>
        </Link>
      </div>
    );
  };

  return (
    loading ? "Loading..." :
    <ListPage
      data={currentUsers}
      listItem={listItem}
      currentPage={currentPage}
      itemCount={currentUsers.length}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
      handleSearch={handleSearch}
      searchable={true}
    /> 
  );
};

export default UsersTab;
