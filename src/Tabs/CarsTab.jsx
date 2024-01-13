// CarsTab.jsx
import React, { useState } from 'react';
import data from '../DummyData.json';
import { Link } from 'react-router-dom';
import './CarsTab.css';

const CarsTab = () => {
	// Example car data (you may replace this with actual data)
	const cars = data.cars;

	// State for search query, current page, and cars to display
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const carsPerPage = 5; // Number of cars to display per page

	// Filtering cars based on search query
	const filteredCars = cars;

	// Calculating the total number of pages
	const totalPages = Math.ceil(filteredCars.length / carsPerPage);

	// Slicing the cars to display for the current page
	const currentCars = filteredCars.slice(
		(currentPage - 1) * carsPerPage,
		currentPage * carsPerPage
	);

	// Handle page change
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

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
									currentPage === index + 1 ? 'is-current' : ''
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
