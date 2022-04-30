import { all, fork, take, call, put, takeEvery, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
/**
 * 기본적으로 이벤트 리스너에서 사용하는 take는 일회성이다.
 *  그래서 while(true) 로 감싸서 무한으로 사용가능하게 하거나
 *  takeEvery를 사용해준다
 *
 *  takeLatest 는 마우스 여러번 클릭과같은 이벤트 중복을 방지해준다(마지막 이벤트만 실행)
 */

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

import postSaga from "./post"
import userSaga from "./user"

axios.defaults.baseURL = "http://localhost:3065";
axios.defaults.withCredentials= true;

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ])
}