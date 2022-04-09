import {all, call, fork, put, takeEvery, takeLatest} from "redux-saga/effects";
import axios from "axios";

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}

function* watchLogIn() {
    yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
    yield takeEvery("LOG_OUT_REQUEST", logOut);
}

function logInAPI(data) {
    return axios.post("/api/login", data)
}
function logOutAPI(data) {
    return axios.post("/api/logout", data)
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: "LOG_IN_SUCCESS",
            data: result.data
        })
    } catch(err) {
        yield put({
            type: "LOG_IN_FAILURE",
            data: err.response.data,
        })
    }
}
function* logOut() {
    try {
        const result = yield call(logOutAPI);
        yield put({
            type: "LOG_OUT_SUCCESS",
            data: result.data
        })
    } catch(err) {
        yield put({
            type: "LOG_OUT_FAILURE",
            data: err.response.data,
        })
    }
}