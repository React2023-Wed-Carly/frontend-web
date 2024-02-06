// actions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_CARS_DATA = 'SET_CARS_DATA';
export const SET_BOOKINGS_DATA = 'SET_BOOKINGS_DATA';
export const SET_PAYMENTS_DATA = 'SET_PAYMENTS_DATA';
export const DELETE_CAR = 'DELETE_CAR';
export const CANCEL_BOOKING = 'CANCEL_BOOKING';

// Action to handle successful login
export const loginSuccess = (jwttoken) => ({
  type: 'LOGIN_SUCCESS',
  payload: jwttoken,
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
export const setBookingsData = (data) => ({
  type: 'SET_BOOKINGS_DATA',
  payload: data,
});
export const setPaymentsData = (data) => ({
  type: 'SET_PAYMENTS_DATA',
  payload: data,
});

export const deleteCar = (carId) => ({
  type: 'DELETE_CAR',
  payload: carId,
});

export const cancelBooking = (bookingId) => ({
  type: 'CANCEL_BOOKING',
  payload: bookingId,
})