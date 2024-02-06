import {LOGOUT_USER, SET_USER_DATA, LOGIN_SUCCESS, SET_CARS_DATA, 
    SET_BOOKINGS_DATA, SET_PAYMENTS_DATA, DELETE_CAR, CANCEL_BOOKING} from "./actions";

const initialState = {
    isLoggedIn: false,
    jwttoken: null,
    userData: [],
    carsData: [],
    bookingsData: [],
    paymentsData: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                jwttoken: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                jwttoken: null,
                userData: [],
                carsData: [],
                bookingsData: [],
                paymentsData: [],
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case SET_CARS_DATA:
            return {
                ...state,
                carsData: action.payload,
            };
        case SET_BOOKINGS_DATA:
            return {
                ...state,
                bookingsData: action.payload,
            };
        case SET_PAYMENTS_DATA:
            return {
                ...state,
                paymentsData: action.payload,
            };
        case DELETE_CAR:
            const updatedCarsData = state.carsData.filter(car => car.id !== action.payload);
            return {
                ...state,
                carsData: updatedCarsData,
              };
        case CANCEL_BOOKING:
        const updatedBookingsData = state.bookingsData.filter(booking => booking.id !== action.payload);
        return {
            ...state,
            bookingsData: updatedBookingsData,
            };
        default:
            return state;
    }
};

export default rootReducer;