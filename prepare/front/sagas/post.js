import axios from "axios";
import {all, call, fork, put, takeLatest, throttle, delay} from "redux-saga/effects";
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS, UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";
import shortId from "shortid";

export default function* postSaga() {
    yield all([
        fork(watchLikePost),
        fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
        fork(watchLoadPosts),
        fork(watchUploadImages),
    ])
}
// 요청보내는 것을 2초내에한번만 가능하게
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchAddPost() {
    // yield throttle(ADD_POST_REQUEST, addPost, 2000);
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchUploadImages() {
    // yield throttle(ADD_POST_REQUEST, addPost, 2000);
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRemovePost() {
    // yield throttle(ADD_POST_REQUEST, addPost, 2000);
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`);
}
function uploadImagesAPI(data) {
    return axios.post(`/post/images`, data);
}
function unlikePostAPI(data) {
    return axios.delete(`/post/${data}/like`);
}
function loadPostsAPI(data) {
    return axios.get("/posts", data);
}
function addPostAPI(data) {
    return axios.post("/post", { content : data});
}
function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            data: err.response.data
        })
    }
}
function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.data);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            // data: result.data,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: err.response.data
        })
    }
}
function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    } catch(err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        })
    }
}
function* removePost(action) {
    console.log("사가" + action);
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data
        })
    }
}


function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        // yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
            // data: action.data,
        });
    } catch(err) {
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }
}
function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        // yield delay(1000);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
            // data: action.data,
        });
    } catch(err) {
        console.error(err);
        yield put({
            type: LIKE_POST_FAILURE,
            data: err.response.data
        })
    }
}
function* unlikePost(action) {
    try {
        const result = yield call(unlikePostAPI, action.data);
        // yield delay(1000);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: result.data,
            // data: action.data,
        });
    } catch(err) {
        console.error(err);
        yield put({
            type: UNLIKE_POST_FAILURE,
            data: err.response.data
        })
    }
}
