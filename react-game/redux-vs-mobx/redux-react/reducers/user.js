import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE } from '../actions/user'
const initialState = [];
const userReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case LOG_IN_REQUEST:
            return {
                ...prevState,
                isLogginIn: true,
            };
        case LOG_IN_SUCCESS:
            return {
                ...prevState,
                data: action.data
                isLogginIn: false,
            };
        case LOG_IN_FAILURE:
            return {
                ...prevState,
                data: null,
                isLogginIn: false,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user: null,
            };
        default:
            return prevState;
    }
};

module.exports = {
    userReducer
}