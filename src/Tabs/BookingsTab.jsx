// BookingsTab.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListPage from "../components/ListPage";
import { fetchBookingsData  } from '../redux/thunks';
import { useDispatch, useSelector } from "react-redux";
import { requestCancelBooking } from "../redux/thunks";
import { DateTime } from "../utils";
import "./CarsTab.css";

const BookingsTab = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.bookingsData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const reservationsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Bookings UseEffect is running!");
        await dispatch(fetchBookingsData(jwtToken, currentPage));
        setLoading(false); // Update loading state after data is fetched
      } catch (error) {
        console.error("Error fetching bookings data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [dispatch, jwtToken, currentPage]);
  const filteredReservations = reservations;

  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);

  const currentReservations = filteredReservations.slice(
    (currentPage) * reservationsPerPage,
    (currentPage + 1) * reservationsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = (item) => {
    const handleDelete = async (id) => {
      try {
        await dispatch(requestCancelBooking(jwtToken, id));
        // After deleting, you may want to refetch the data
        await dispatch(fetchBookingsData(jwtToken, currentPage));
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    };
    return (
      <div key={item.id} className="list-element">
        <Link to={`/home/bookings/${item.id}`}>
        <DateTime dateTimeString={item.startDate} />
        </Link>
        <button className="button is-danger is-small" onClick={() => handleDelete(item.id)}>Cancel</button>
      </div>
    );
  };

  return (
    loading ? "Loading..." :
    <ListPage
      data={currentReservations}
      listItem={listItem}
      currentPage={currentPage + 1}
      totalPages={totalPages}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    />
  );
};

export default BookingsTab;
