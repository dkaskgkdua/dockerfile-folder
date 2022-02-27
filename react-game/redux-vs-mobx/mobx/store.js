const {observable} = require("mobx");


// @observable 써도 되고 만약에 안된다면 아래처럼 감싸주며 됨
export const userStore = observable({
    isLoggingIn: false,
    data: null,
    logIn(data) {
        this.isLoggingIn = true;
        setTimeout(() => {
            this.data = data;
            this.isLoggingIn = false;
            postStore.data.push(1);
        }, 2000);
    },
    logOut() {
        this.data = null;
    }
});

export const postStore = observable({
    data: [],
    addPost(data) {
        this.data.push(data);
    }
});