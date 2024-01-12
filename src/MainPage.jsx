// MainPage.jsx
import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	NavLink,
} from 'react-router-dom';
import CarsTab from './Tabs/CarsTab';
import UsersTab from './Tabs/UsersTab';
import BookingsTab from './Tabs/BookingsTab';
import PaymentsTab from './Tabs/PaymentsTab';
import 'bulma/css/bulma.min.css';
import './MainPage.css';

const MainPage = () => {
	return (
		<Router>
			<div className="columns">
				{/* Sidebar with tabs */}
				<div className="column is-one-quarter">
					<aside className="menu">
						<p className="menu-label">Navigation</p>
						<ul className="menu-list">
							<li>
								<NavLink to="/cars" className="nav-link" end>
									Cars
								</NavLink>
							</li>
							<li>
								<NavLink to="/users" className="nav-link" end>
									Users
								</NavLink>
							</li>
							<li>
								<NavLink to="/bookings" className="nav-link" end>
									Bookings
								</NavLink>
							</li>
							<li>
								<NavLink to="/payments" className="nav-link" end>
									Payments
								</NavLink>
							</li>
						</ul>
					</aside>
				</div>

				{/* Tab content on the right */}
				<div className="column">
					<div className="tab-content">
						<Routes>
							<Route path="/cars" element={<CarsTab />} />
							<Route path="/users" element={<UsersTab />} />
							<Route path="/bookings" element={<BookingsTab />} />
							<Route path="/payments" element={<PaymentsTab />} />
						</Routes>
					</div>
				</div>
			</div>
		</Router>
	);
};

export default MainPage;
