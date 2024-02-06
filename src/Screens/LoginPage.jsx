// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, fetchUserData } from '../redux/thunks';
import './LoginPage.css';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
		  // Dispatch the loginUser action to get the token
		  const response = await dispatch(loginUser(username, password));
			
		  if (response.status === 200)
		  {
			console.log(`${response}`)
		  	navigate('/main');
		  }
		} catch (error) {
		  console.error('Login failed:', error);
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
