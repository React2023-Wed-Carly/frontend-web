import {LOGOUT_USER, SET_USER_DATA, LOGIN_SUCCESS} from "./actions";

const initialState = {
    isLoggedIn: false,
    userData: [],
    jwttoken: null,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                jwttoken: action.payload
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isLoggedIn: false,
                jwtToken: null,
                userData: [],
            };
        default:
            return state;
    }
};

export default rootReducer;