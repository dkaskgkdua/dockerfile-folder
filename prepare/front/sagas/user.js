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
    LOAD_USER_FAILURE,
    CHANGE_NICKNAME_FAILURE,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_REQUEST,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_SUCCESS,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE
} from "../reducers/user";

function loadFollowersAPI(data) {
    return axios.get('/user/followers',data);
}
function loadFollowingsAPI(data) {
    return axios.get('/user/followings', data);
}

function logInAPI(data) {
    return axios.post("/user/login", data);
}
function logOutAPI(data) {
    return axios.post("/user/logout", data);
}
function signUpAPI(data) {
    return axios.post("/user", data);
}
function followAPI(data) {
    return axios.patch(`/user/${data}/follow`, data);
}
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}
function loadUserAPI(data) {
    return axios.get(`/user/${data}`);
}
function loadMyInfoAPI() {
    return axios.get("/user");
}

function changeNicknameAPI(data) {
    return axios.patch("/user/nickname", { nickname : data});
}
function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}


function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
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

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        })
    }
}
function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        })
    }
}
function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        })
    }
}
function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        })
    }
}
function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}
function* unfollow(action) {
    try {
        console.log("unfollow",action)
        const result = yield call(unfollowAPI, action.data);
        console.log("gg")
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data
        })
    } catch(err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
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
            error: err.response.data,
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
            error: err.response.data,
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
            error: err.response.data,
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
            error: err.response.data,
        })
    }
}
function* loadMyInfo(action) {
    try {
        const result = yield call(loadMyInfoAPI, action.data);
        // yield delay(1000);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        })
    } catch(err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    }
}

export default function* userSaga() {
    yield all([
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLoadUser),
        fork(watchLoadMyInfo),
        fork(watchChangeNickname),
    ])
}