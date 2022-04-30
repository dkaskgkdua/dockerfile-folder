import {all, call, fork, put, takeEvery, takeLatest, delay} from "redux-saga/effects";
import axios from "axios";
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE
} from "../reducers/user";

function logInAPI(data) {
    return axios.post("/user/login", data)
}
function logOutAPI(data) {
    return axios.post("/user/logout", data)
}
function signUpAPI(data) {
    return axios.post("/user", data)
}
function followAPI(data) {
    return axios.post("/api/signUp", data)
}
function unfollowAPI(data) {
    return axios.post("/api/signUp", data)
}
function loadUserAPI() {
    return axios.get("/user")
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
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* follow(action) {
    try {
        // const result = yield call(signUpAPI, action.data);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    } catch(err) {
        yield put({
            type: FOLLOW_FAILURE,
            data: err.response.data,
        })
    }
}
function* unfollow(action) {
    try {
        // const result = yield call(signUpAPI, action.data);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    } catch(err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err.response.data,
        })
    }
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        // yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data
        })
    } catch(err) {
        console.log("faile", err.response)
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data,
        })
    }
}
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        // yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            // data: result.data,
            data: result.data,
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
        yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch(err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data,
        })
    }
}

function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        // yield delay(1000);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        yield put({
            type: LOAD_USER_FAILURE,
            data: err.response.data,
        })
    }
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadUser),
    ])
}