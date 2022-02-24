const { observable, autorun, runInAction } =  require('mobx');

const state = observable({
    compA: 'a',
    compB: 12,
    compC: null,
});
// 바뀐걸 감지 -> 콜백
autorun(() => {
    console.log('changed' + state.compA);
})
// runInAction 단위로 커밋
runInAction(() => {
    state.compA = 'b';
    state.compB = 13;
});
runInAction(() => {
    state.compA = 'c';
});
