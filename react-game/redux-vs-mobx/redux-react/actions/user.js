
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

const logInFailure = (error) => {
    return {
        type: 'LOG_IN_FAILURE',
        error
    }
}

const logInRequest = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data
    }
}
const logInSuccess = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

module.exports = {
    logIn,
    logOut
}