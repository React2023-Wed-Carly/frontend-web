import {
	loginSuccess, setUserData, setCarsData, setBookingsData,
	setPaymentsData, deleteCar, cancelBooking
} from "./actions";
import axios from 'axios';

const URL = 'http://localhost:8080';

export const loginUser = (username, password) => async (dispatch) => {
	try {
		const response = await axios.post(`${URL}/auth/login`,
			{
				username,
				password,
			});
		const token = response.data.jwttoken;
		dispatch(loginSuccess(token));

		console.log("Logging in!");
		return response;
	} catch (error) {

		console.error('Login failed:', error);
		alert('Invalid credentials. Please try again.');
		throw error;
	}
};

export const fetchUserData = (jwtToken, page, userId, username) => async (dispatch) => {
	try {
		const params = {};

		if (page !== undefined) {
			params.page = page;
		}

		if (userId !== undefined) {
			params.userId = userId;
		}

		if (username !== undefined) {
			params.username = username;
		}
		const response = await axios.get(`${URL}/manage/users`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			},
			params: params,
		});

		dispatch(setUserData(response.data));

		return response;
	} catch (error) {
		console.error('Failed to fetch user data:', error);
		throw error; 
	}
};

export const fetchUserDataById = (jwtToken, userId) => async (dispatch) => {
	try {
		const response = await axios.get(`${URL}/manage/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			}});

		dispatch(setUserData([response.data]));

		return response;
	} catch (error) {
		console.error('Failed to fetch user data:', error);
		throw error; 
	}
};

export const fetchCarsData = (jwtToken, page) => async (dispatch) => {
	try {
		const response = await axios.get(`${URL}/manage/cars`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			},
			params: {
				page: page
			},
		});

		dispatch(setCarsData(response.data));
		console.log(response)
		return response;

	} catch (error) {
		console.error('Failed to fetch cars data:', error);
		throw error;
	}
};

export const fetchBookingsData = (jwtToken, page) => async (dispatch) => {
	try {
		const response = await axios.get(`${URL}/manage/bookings`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			},
			params: {
				page: page
			},
		});

		dispatch(setBookingsData(response.data));
		console.log(response)
		return response;

	} catch (error) {
		console.error('Failed to fetch bookings data:', error);
		throw error;
	}
};

export const fetchPaymentsData = (jwtToken, page) => async (dispatch) => {
	try {
		const response = await axios.get(`${URL}/manage/payments`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			},
			params: {
				page: page
			},
		});
		dispatch(setPaymentsData(response.data));
		console.log(response)
		return response;

	} catch (error) {
		console.error('Failed to fetch bookings data:', error);
		throw error;
	}
};

export const requestDeleteCar = (jwtToken, carId) => async (dispatch) => {
	try {
		const response = await axios.delete(`${URL}/manage/cars/${carId}`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			},
		});
		dispatch(deleteCar(carId));
		console.log(`Car with ID ${carId} deleted successfully!`);
		return response;
	} catch (error) {
		console.error('Error deleting car:', error);
	};
}

export const requestCancelBooking = (jwtToken, bookingId) => async (dispatch) => {
	try {
		const response = await axios.delete(`${URL}/manage/bookings/${bookingId}`, {
			headers: {
				Authorization: `Bearer ${jwtToken}`
			},
		});
		dispatch(cancelBooking(bookingId));
		console.log(`Booking with ID ${bookingId} canceled successfully!`);
		return response;
	} catch (error) {
		console.error('Error cancelling booking: ', error);
	};
}

export const requestCreateCar = (jwtToken, body) => async (dispatch) => {
	try {
		const response = await axios.post(`${URL}/manage/cars`, body, {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				'Content-Type': 'application/json'
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.error('Error creating car: ', error);
	};
}
export const requestUpdateCar = (jwtToken, carId, body) => async (dispatch) => {
	try {
		const response = await axios.put(`${URL}/manage/cars/${carId}`, body, {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				'Content-Type': 'application/json'
			},
		});
		console.log(response);
		return response;
	} catch (error) {
		console.error('Error updating car: ', error);
	};
}

export const updateCarImage = (jwtToken, carId, image) => async (dispatch) => {
	try {
		console.log("got into function")
		const response = await axios.post(`${URL}/manage/cars/${carId}/image`, image, {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
				'Content-Type': 'multipart/form-data'
			},
		});
		console.log(`Image changed!`);
		return response;
	} catch (error) {
		console.error('Error changing image: ', error);
	};
}