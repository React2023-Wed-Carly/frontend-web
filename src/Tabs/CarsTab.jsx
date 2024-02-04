// CarsTab.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CarsTab.css";
import ListPage from "../components/ListPage";
import { fetchCarsData  } from '../redux/thunks';

const CarsTab = () => {
  
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.carsData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const carsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Cars UseEffect is running!");
        await dispatch(fetchCarsData(jwtToken, currentPage));
        setLoading(false); // Update loading state after data is fetched
      } catch (error) {
        console.error("Error fetching cars data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [dispatch, jwtToken, currentPage]);

  // Filtering cars based on search query
  const filteredCars = cars;

  // Calculating the total number of pages
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Slicing the cars to display for the current page
  const currentCars = filteredCars.slice(
    (currentPage) * carsPerPage,
    (currentPage + 1) * carsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = ( item ) => {
    return (
      <div key={item.id} className="list-element">
        <figure className="image is-128x128">
          <img src={`data:image/jpeg;base64,${item.img}`} alt={item.info.model}
          className="is-rounded"></img>
        </figure>
        <Link to={`/home/cars/${item.info.id}`}>
          <p>
            {item.info.id} {item.info.make} {item.info.model}
          </p>
        </Link>
      </div>
    );
  };

  return (
    loading ? (
      "Loading..."
    ) : (
      <ListPage
        data={currentCars}
        listItem={listItem}
        currentPage={currentPage + 1}
        totalPages={totalPages}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handlePageChange={handlePageChange}
      />
    )
  );
  return (
    <div>
      {/* Search Bar */}
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter make or model"
          />
        </div>
        <div className="control">
          <button
            className="button is-info"
            onClick={() => handlePageChange(1)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Paged List of Cars */}
      <div>
        {currentCars.map((car) => (
          <div key={car.id} className="list-element">
            <Link to={`/home/cars/${car.id}`}>
              <p>
                {car.id} {car.make} {car.model}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="pagination" role="navigation" aria-label="pagination">
        <button
          className="pagination-previous button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="pagination-next button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <ul className="pagination-list">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                className={`pagination-link button ${
                  currentPage === index + 1 ? "is-current" : ""
                }`}
                aria-label={`Goto page ${index + 1}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CarsTab;
