const { createStore, compose, applyMiddleware} = require('redux');
const reducer = require('./reducers/index');
const { addPost } = require('./actions/post');
const { logOut, logIn } = require('./actions/user');

const initialState = {
    user: {
        isLoggingIn: true,
        data: null,
    },
    posts: [],
    // comments: [],
    // favorites: [],
    // history: [],
    // likes: [],
    // followers: [],
};
// store에 미들웨어 추가(다른 것도 추가 가능 compose 안에)
const firstMiddleware = (store) => (dispatch) => (action) => {
    console.log('액션 로그 : ', action);
    dispatch(action);
};
// 중간 로직이 필요없다면 상단처럼 화살표함수로 주링ㅁ
// function firstMiddleware(store) {
//     // 무언가 로직
//     return function(next) {
//         // 무언가 로직
//         return function(action) {
//             // 무언가 로직
//         }
//     }
// }
const thunkMiddleware = (store) => (dispatch) => (action) => {
    if(typeof action === 'function') { // 비동기인 경우 액션을 함수로
        return action(store.dispatch, store.getState);
    }
  return dispatch(action);
};
const enhancer = compose(
    applyMiddleware(firstMiddleware, thunkMiddleware),
);

const store = createStore(reducer, initialState, enhancer);

module.exports = store;