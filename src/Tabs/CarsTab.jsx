// CarsTab.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CarsTab.css";
import ListPage from "../components/ListPage";
import { fetchCarsData } from '../redux/thunks';

const CarsTab = () => {

  const dispatch = useDispatch();
  const cars = useSelector((state) => state.carsData);
  const jwtToken = useSelector((state) => state.jwttoken);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Cars UseEffect is running!");
        await dispatch(fetchCarsData(jwtToken, currentPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, jwtToken, currentPage]);

  const currentCars = cars;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const listItem = (item) => {
    return (
      <div key={item.id} className="list-element">
        <figure className="image">
          <img src={`data:image/jpeg;base64,${item.img}`} alt={item.info.model}
            className="is-rounded" style={{ height: 128 }}></img>
        </figure>
        <Link to={`/home/cars/${item.info.id}`}>
          <p style={{ marginLeft: 10, fontSize: 24 }}>
             {item.info.brand} {item.info.model}
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
          currentPage={currentPage}
          itemCount={currentCars.length}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handlePageChange={handlePageChange}
          add={true}
        />
    )
  );
};

export default CarsTab;
