// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = () => {
		// In a real application, you would perform authentication logic here.
		// For simplicity, let's use a hardcoded example.
		if (username === 'example' && password === 'password') {
			onLogin();
			navigate('/main');
		} else {
			alert('Invalid credentials. Please try again.');
		}
	};

	return (
		<div className="container has-text-centered">
			<div className="column is-4">
				<h2 className="title is-1">Carly</h2>
				<form>
					<div className="field">
						<label className="label">Username</label>
						<div className="control">
							<input
								className="input"
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input
								className="input"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button
								type="button"
								className="button is-primary is-warning"
								onClick={handleLogin}
							>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
