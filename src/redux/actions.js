// actions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_USER_DATA = 'SET_USER_DATA';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action to handle successful login
export const loginSuccess = (jwtToken) => ({
  type: 'LOGIN_SUCCESS',
  payload: jwtToken,
});

// Action to set user data in the state
export const setUserData = (data) => ({
  type: 'SET_USER_DATA',
  payload: data,
});

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
  });

