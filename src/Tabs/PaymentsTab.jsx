// PaymentsTab.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListPage from "../components/ListPage";
import { fetchPaymentsData  } from '../redux/thunks';
import { useDispatch, useSelector } from "react-redux";

const PaymentsTab = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.paymentsData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const paymentsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Payments UseEffect is running!");
        await dispatch(fetchPaymentsData(jwtToken, currentPage));
        setLoading(false); // Update loading state after data is fetched
      } catch (error) {
        console.error("Error fetching bookings data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [dispatch, jwtToken, currentPage]);

  const filteredPayments = payments;

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const currentPayments = filteredPayments.slice(
    (currentPage) * paymentsPerPage,
    (currentPage + 1) * paymentsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = (item) => {
    return (
      <div key={item.id} className="list-element">
        <Link to={`/home/payments/${item.id}`}>
          <p>{item.id} {item.date}</p>
        </Link>
      </div>
    );
  };

  return (
    loading ? "Loading..." :
    <ListPage
      data={currentPayments}
      listItem={listItem}
      currentPage={currentPage + 1}
      totalPages={totalPages}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    />
  );
};

export default PaymentsTab;
