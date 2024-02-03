// MainPage.jsx
import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
	NavLink,
} from 'react-router-dom';
import CarsTab from '../Tabs/CarsTab';
import UsersTab from '../Tabs/UsersTab';
import BookingsTab from '../Tabs/BookingsTab';
import PaymentsTab from '../Tabs/PaymentsTab';
import LoginPage from './LoginPage';
import CarDetailsPage from '../DetailPages/CarDetailsPage'; // Import the CarDetailsPage
import UserDetailsPage from '../DetailPages/UserDetailsPage';
import 'bulma/css/bulma.min.css';
import './MainPage.css';
import data from '../DummyData.json';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserData } from '../redux/thunks';
import { logoutUser } from '../redux/actions';

const MainPage = () => {
	const dispatch = useDispatch();
	//const [isLoggedIn, setLoggedIn] = useState(false);
	const isLoggedIn = useSelector((state) => state.isLoggedIn);

	const handleLogin = async (username, password) => {
		try {
		  // Dispatch the loginUser action to get the token
		  const response = await dispatch(loginUser(username, password));
	
		  // Assuming the backend returns a token in the response
		  const token = response.data.token;
	
		  // Specify the desired page (e.g., 1, 2, 3, etc.)
		  const desiredPage = 0;
	
		  // Dispatch fetchUserData action to get user data with the specified page
		  await dispatch(fetchUserData(desiredPage));
		} catch (error) {
		  console.error('Login failed:', error);
		  alert('Invalid credentials. Please try again.');
		}
	  };
	
	  const handleLogout = () => {
		// Dispatch the logoutUser action to reset authentication state
		dispatch(logoutUser());
	  };
	

	return (
		<Router>
			<div className="main">
				{/* Render LoginPage or MainPage based on login status */}
				{isLoggedIn ? (
					<div className="columns">
						{/* Sidebar with tabs */}
						<div className="column is-2 sidebar">
							<aside className="menu">
								<p className="menu-label">Navigation</p>
								<ul className="menu-list">
									<li>
										<NavLink to="/home/cars" className="nav-link" end>
											Cars
										</NavLink>
									</li>
									<li>
										<NavLink to="/home/users" className="nav-link" end>
											Users
										</NavLink>
									</li>
									<li>
										<NavLink to="/home/bookings" className="nav-link" end>
											Bookings
										</NavLink>
									</li>
									<li>
										<NavLink to="/home/payments" className="nav-link" end>
											Payments
										</NavLink>
									</li>
								</ul>
							</aside>
							{isLoggedIn && (
								<div className="logout-container">
									<Link
										to="/"
										onClick={handleLogout}
										className="button is-outlined is-danger"
									>
										Logout
									</Link>
								</div>
							)}
						</div>
						<div className="column">
							<div className="tab-content">
								<Routes>
									<Route path="/home/cars" element={<CarsTab />} />
									<Route path="/home/users" element={<UsersTab />} />
									<Route path="/home/bookings" element={<BookingsTab />} />
									<Route path="/home/payments" element={<PaymentsTab />} />
									<Route
										path="/home/cars/:carId"
										element={
											<CarDetailsPage
												cars={data.cars}
												onDeleteCar={() => {}}
												onUpdateCar={() => {}}
											/>
										}
									/>
									<Route
										path="/home/users/:userId"
										element={
											<UserDetailsPage
												users={data.users}
												onDeleteUser={() => {}}
												onUpdateUser={() => {}}
											/>
										}
									/>
									<Route
										path="/home/bookings/:bookingId"
										element={
											<UserDetailsPage
												bookings={data.reservations}
												onDeleteUser={() => {}}
												onUpdateUser={() => {}}
											/>
										}
									/>
									<Route
										path="/home/payments/:paymentId"
										element={
											<UserDetailsPage
												payments={data.payments}
												onDeleteUser={() => {}}
												onUpdateUser={() => {}}
											/>
										}
									/>
									{/* Add a default route for /main that redirects to /home/cars */}
									<Route path="/main" element={<Navigate to="/home/cars" />} />
								</Routes>
							</div>
						</div>
					</div>
				) : (
					<div className="column">
						<LoginPage onLogin={handleLogin} />
					</div>
				)}

				{/* Tab content on the right */}
			</div>
		</Router>
	);
};

export default MainPage;
