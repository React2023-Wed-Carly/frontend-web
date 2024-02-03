// actions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_CARS_DATA = 'SET_CARS_DATA';

// Action to handle successful login
export const loginSuccess = (jwtToken) => ({
  type: 'LOGIN_SUCCESS',
  payload: jwtToken,
});

export const logoutUser = () => ({
  type: 'LOGOUT_USER',
});

export const setUserData = (data) => ({
  type: 'SET_USER_DATA',
  payload: data,
});

export const setCarsData = (data) => ({
  type: 'SET_CARS_DATA',
  payload: data,
});
