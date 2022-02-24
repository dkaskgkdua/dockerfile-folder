
const logOut = () => {
    return {
        type: "LOG_OUT",
    };
};

const logIn = (data) => { // async action creator
    return (dispatch, getState) => {
        dispatch(logInRequest(data)); // 동기작업
        try {
            setTimeout(() => { // 비동기 작업
                dispatch(logInSuccess({
                    userId: 1,
                    nickname: 'mj',
                })); // 동기작업
            }, 2000);
        } catch (e) {
            dispatch(logInFailure(e));
        }
    };
}
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

const logInFailure = (error) => {
    return {
        type: 'LOG_IN_FAILURE',
        error
    }
}

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
const logInRequest = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data
    }
}
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
const logInSuccess = (data) => {
    return {
        type: LOG_IN_SUCCESS,
        data,
    }
}

module.exports = {
    logIn,
    logOut
}