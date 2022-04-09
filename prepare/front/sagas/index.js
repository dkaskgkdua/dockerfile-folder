import { all, fork, take, call, put, takeEvery, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data) {
    return axios.post("/api/login", data)
}
function logOutAPI(data) {
    return axios.post("/api/logout", data)
}
function addPostAPI(data) {
    return axios.post("/api/post", data);
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: "ADD_POST_SUCCESS",
            data: result.data
        });
    } catch(err) {
        yield put({
            type: "ADD_POST_FAILURE",
            data: err.response.data
        })
    }
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

/**
 * 기본적으로 이벤트 리스너에서 사용하는 take는 일회성이다.
 *  그래서 while(true) 로 감싸서 무한으로 사용가능하게 하거나
 *  takeEvery를 사용해준다
 *
 *  takeLatest 는 마우스 여러번 클릭과같은 이벤트 중복을 방지해준다(마지막 이벤트만 실행)
 */
function* watchLogin() {
    yield takeLatest("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
    yield takeEvery("LOG_OUT_REQUEST", logOut);
}
// 요청보내는 것을 2초내에한번만 가능하게
function* watchAddPost() {
    yield throttle("ADD_POST_REQUEST", addPost, 2000);
}

/**
 *
 * fork와 call로 실행이 가능한데 기능을 구분해야한다.
 * fork : 비동기 함수 호출
 *   const result = yield fork(logInAPI);
 *   yield put({
 *       type: "LOG_IN_SUCCESS",
 *       data: result.data
 *   })
 * call : 동기 함수 호출
 *   const result = yield call(logInAPI);
 *   result.then(() => {
 *       yield put({
 *           type: "LOG_IN_SUCCESS",
 *           data: result.data
 *       })
 *   })
 */

export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchAddPost),
    ])
}