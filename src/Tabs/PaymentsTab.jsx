import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListPage from "../components/ListPage";
import { fetchPaymentsData  } from '../redux/thunks';
import { useDispatch, useSelector } from "react-redux";
import { Payment, bigintToFloat } from "../utils";

const PaymentsTab = () => {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.paymentsData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Payments UseEffect is running!");
        await dispatch(fetchPaymentsData(jwtToken, currentPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, jwtToken, currentPage]);

  const currentPayments = payments;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = (item) => {
    return (
      <div key={item.id} className="list-element">
        <Link to={`/home/payments/${item.id}`}>
          <Payment userId={item.userId} amount={bigintToFloat(item.amount)}/>
        </Link>
      </div>
    );
  };

  return (
    loading ? "Loading..." :
    <ListPage
      data={currentPayments}
      listItem={listItem}
      currentPage={currentPage}
      itemCount={currentPayments.length}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    />
  );
};

export default PaymentsTab;
