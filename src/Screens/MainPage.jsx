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
import 'bulma/css/bulma.min.css';
import './MainPage.css';

const MainPage = () => {
	const [isLoggedIn, setLoggedIn] = useState(false);

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleLogout = () => {
		setLoggedIn(false);
	};

	return (
		<Router>
			<div className="main">
				{/* Render LoginPage or MainPage based on login status */}
				{isLoggedIn ? (
					<div className="columns">
						{/* Sidebar with tabs */}
						<div className="column is-2">
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