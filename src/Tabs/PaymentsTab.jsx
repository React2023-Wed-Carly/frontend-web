// PaymentsTab.jsx
import React, { useState } from "react";
import data from "../DummyData.json";
import { Link } from "react-router-dom";
import ListPage from "../components/ListPage";

const PaymentsTab = () => {
  const payments = data.payments;

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  const filteredPayments = payments;

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  const currentPayments = filteredPayments.slice(
    (currentPage - 1) * paymentsPerPage,
    currentPage * paymentsPerPage
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
    <ListPage
      data={currentPayments}
      listItem={listItem}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handlePageChange={handlePageChange}
    />
  );
};

export default PaymentsTab;
