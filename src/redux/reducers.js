import {LOGOUT_USER, SET_USER_DATA, LOGIN_SUCCESS, SET_CARS_DATA, 
    SET_BOOKINGS_DATA, SET_PAYMENTS_DATA} from "./actions";

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
        default:
            return state;
    }
};

export default rootReducer;