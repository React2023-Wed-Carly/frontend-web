// BookingsTab.jsx
import React, { useState } from "react";
import data from "../DummyData.json";
import { Link } from "react-router-dom";
import ListPage from "../components/ListPage";

const BookingsTab = () => {
const reservations = data.reservations;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reservationsPerPage = 5;

  const filteredReservations = reservations;

  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

  const currentReservations = filteredReservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = (item) => {
    return (
      <div key={item.id} className="list-element">
        <Link to={`/home/bookings/${item.id}`}>
          <p>{item.id}</p>
        </Link>
      </div>
    );
  };

  return (
    <ListPage
      data={currentReservations}
      listItem={listItem}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    />
  );
};

export default BookingsTab;
