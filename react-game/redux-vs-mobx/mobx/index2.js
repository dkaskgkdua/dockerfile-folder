const { observable, autorun, runInAction, reaction, action } =  require('mobx');

const userState = observable({
    isLoggingIn: true,
    data: null,
});

const postState = observable([]);

runInAction(() => {
    postState.push({id: 1, content: '안녕하세요.'});
    userState.data = {
        id: 1,
        nickname: 'zerocho',
    };
})


// 모든 상태 바뀐걸 감지 -> 콜백
autorun(() => {
    console.log('changed' + state.compA);
})

// 첫번째 인수(함수)에서 리턴하는 값이 바뀌면 실행
reaction(() => {
    return state.compB;
}, () => {
    console.log("리엑션 : " +state.compB);
})
//필요한 타이밍에 실행하고 싶을 경우
const change = action(() => {
    state.compA = 'bb';
    state.compB = 55;
    state.compC = 'bb';
})

// runInAction 단위로 커밋, 바로실행
runInAction(() => {
    state.compA = 'b';
    state.compB = 13;
});
runInAction(() => {
    state.compA = 'c';
});

// 지금 타이밍에 액셜 싱행
change();