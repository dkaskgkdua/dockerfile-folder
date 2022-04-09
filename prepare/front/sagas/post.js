import axios from "axios";
import {all, call, fork, put, throttle} from "redux-saga/effects";

export default function* postSaga() {
    yield all([
        fork(addPost),
    ])
}
// 요청보내는 것을 2초내에한번만 가능하게
function* watchAddPost() {
    yield throttle("ADD_POST_REQUEST", addPost, 2000);
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
