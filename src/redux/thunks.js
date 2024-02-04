import { loginSuccess, setUserData, setCarsData, setBookingsData, setPaymentsData, deleteCar } from "./actions";
import axios from 'axios';

const URL = 'https://wedcarly.azurewebsites.net';

export const loginUser = (username, password) => async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/auth/login`, 
      {
        username,
        password,
      });
      const token = response.data.jwttoken;
      // Dispatch login success action with the token
      dispatch(loginSuccess(token));
    
      console.log("Logging in!");
      // Return the response for further processing if needed
      return response;
    } catch (error) {
      
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
      throw error; 
    }
  };
  
  // Async action to fetch user data
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
  
      // Dispatch setUserData action with the fetched data
      dispatch(setUserData(response.data));
  
      // Return the response for further processing if needed
      return response;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw error; // Re-throw the error to indicate data fetching failure
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