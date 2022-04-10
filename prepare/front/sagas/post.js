import axios from "axios";
import {all, call, fork, put, takeLatest, throttle, delay} from "redux-saga/effects";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS
} from "../reducers/post";

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}
// 요청보내는 것을 2초내에한번만 가능하게
function* watchAddPost() {
    // yield throttle(ADD_POST_REQUEST, addPost, 2000);
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function addPostAPI(data) {
    return axios.post("/api/post", data);
}
function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addPost(action) {
    console.log("사가" + action);
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })
    }
}
function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            // data: result.data,
            data: action.data,
        });
    } catch(err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }
}
