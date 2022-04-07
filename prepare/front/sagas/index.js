import { all, fork, take, call, put } from "redux-saga/effects";
import axios from "axios";

function logInAPI(data, a) {
    return axios.post("/api/login", data)
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data, 'a');
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

function* watchLogin() {
    yield take("LOG_IN_REQUEST", logIn);
}
function* watchLogOut() {
    yield take("LOG_OUT_REQUEST");
}
function* watchAddPost() {
    yield take("ADD_POST_REQUEST");
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