const { createStore } = require('redux');
const reducer = (prevState, action) => {
    switch(action.type) {
        case 'CHANGE_COMP_A':
            return {
                ...prevState,
                compA: action.data,
            }
        default:
            return prevState;
    }
};
const initialState = {
    compA: 'a',
    compB: 12,
    compC: null,
};

const nextState = {
    ...initialState,
    compA: 'b',
}

const store = createStore(reducer, initialState);
store.subscribe(() => { // react-redux안에 들어있음.. 그래서 잘 안씀
    console.log('change'); // 화면 바꿔주는 코드 여기서
})
console.log('1st ',store.getState());


const changeComp = (data) => {
    return { // action
        type: 'CHANGE_COMP_A',
        data,
    }
}

// dispatch
store.dispatch(changeComp('b'));

console.log('2st ',store.getState());

