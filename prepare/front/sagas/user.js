import {all, call, fork, put, takeEvery, takeLatest, delay} from "redux-saga/effects";
import axios from "axios";
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE
} from "../reducers/user";

function logInAPI(data) {
    return axios.post("/api/login", data)
}
function logOutAPI(data) {
    return axios.post("/api/logout", data)
}
function signUpAPI(data) {
    return axios.post("/api/signUp", data)
}


function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* signUp(action) {
    try {
        // const result = yield call(signUpAPI, action.data);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data,
        })
    }
}
function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            // data: result.data,
            data: action.data,
        })
    } catch(err) {
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data,
        })
    }
}
function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data,
        })
    }
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}