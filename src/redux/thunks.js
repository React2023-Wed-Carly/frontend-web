import { loginSuccess, setUserData } from "./actions";
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
      console.log(response.status);
      // Dispatch login success action with the token
      dispatch(loginSuccess(token));
  
      // Return the response for further processing if needed
      return response;
    } catch (error) {
      
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
      throw error; 
    }
  };
  
  // Async action to fetch user data
  export const fetchUserData = (jwtToken, page) => async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/manage/users`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          },
        params: {
          page: page,
          userId: 2, // hard coded because getting users page without filters is broken at backend rn
          username: "usr2"
        },
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
  