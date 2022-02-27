import React, { Component } from 'react';
import {observable} from 'mobx';
import { observer } from 'mobx-react';
import { userStore, postStore} from './store';

// @observer // 컴포넌트 내에서 observable 데이터가 바뀌면 리랜더링 해줌
class App extends Component {
    // 컴포넌트 내에서 선언하고 관리하면...
    state = observable({
        name: '',
        password: '',
    })
    onLogIn = () => {
        userStore.logIn({
            nickname: "송민준",
            password: "비밀번호",
        });
    };
    onLogout = () => {
        userStore.logOut();
    };
    onChangeName = (e) => {
        this.state.name = e.target.value;
    }
    onChangePassword = (e) => {
        this.state.password = e.target.value;
    }

    render() {
        return (
            <div>
                {userStore.isLoggingIn
                    ? <div>로그인 중</div>
                    : userStore.data
                        ? <div>{userStore.data.nickname}</div>
                        : '로그인 해주세요.'}
                {!userStore.data
                    ? <button onClick={this.onLogIn}>로그인</button>
                    : <button onClick={this.onLogout}>로그아웃</button>}
                <div>{postStore.data.length}</div>
                <div>
                    <input value={this.state.name} onChange={this.onChangeName}/>
                    <input value={this.state.password} type="password" onChange={this.onChangePassword}/>
                </div>
            </div>
        )
    }
}

export default observer(App);