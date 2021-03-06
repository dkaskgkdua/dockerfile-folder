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
    LIKE_POST_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    RETWEET_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
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
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchUploadImages),
        fork(watchRetweet),
        fork(watchUpdatePost),
    ])
}
// 요청보내는 것을 2초내에한번만 가능하게
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}
function* watchLoadUserPosts() {
    yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchLoadHashtagPosts() {
    yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}
function* watchUpdatePost() {
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}
function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRemovePost() {
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
function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0}&limit=10&offset=10`);
}
function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}
function loadHashtagPostsAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}
function addPostAPI(data) {
    return axios.post("/post", data);
}
function removePostAPI(data) {
    return axios.delete(`/post/${data}`);
}
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
}
function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet`);
}
function updatePostAPI(data) {
    return axios.patch(`/post/${data.PostId}`, data);
}

function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: RETWEET_FAILURE,
            error: err.response.data
        })
    }
}
function* updatePost(action) {
    try {
        const result = yield call(updatePostAPI, action.data);
        yield put({
            type: UPDATE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: UPDATE_POST_FAILURE,
            error: err.response.data,
        });
    }
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
            error: err.response.data
        })
    }
}
function* loadPosts(action) {
    try {
        const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        })
    }
}
function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: err.response.data
        })
    }
}
function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: err.response.data
        })
    }
}
function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch(err) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data
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
            error: err.response.data
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
            error: err.response.data
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
            error: err.response.data
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
            error: err.response.data
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
            error: err.response.data
        })
    }
}
