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
const enhancer = compose(
    applyMiddleware(firstMiddleware),
);

const store = createStore(reducer, initialState, enhancer);
store.subscribe(() => { // react-redux안에 들어있음.. 그래서 잘 안씀
    console.log('change'); // 화면 바꿔주는 코드 여기서
})
console.log('1st ',store.getState());

store.dispatch({
    type: "LOG_IN_REQUEST",
});

// dispatch
store.dispatch(logIn({
    id: 1,
    name: 'minjune',
    admin: true,
}));

console.log('2nd ',store.getState());


store.dispatch(addPost({
    id: 1,
    userId: 1,
    content: "안녕하세요. 리덕스",
}));

console.log('3rd ',store.getState());

store.dispatch(addPost({
    id: 2,
    userId: 1,
    content: "두번째. 리덕스",
}));

console.log('4th ',store.getState());
store.dispatch(logOut());
console.log('5th ',store.getState());