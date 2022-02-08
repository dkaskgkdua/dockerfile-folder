import React, {FC} from 'react';
import {useLocalStore, useObserver } from "mobx-react";
import {action} from "mobx";
import { postStore, userStore } from "./storeMobx";
import { useCallback } from "react";

interface LocalStore {
    name: string,
    password: string,
    onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
const AppHook: FC = () => {
   const state = useLocalStore<LocalStore>(() => ({
       name: '',
       password: '',
       onChangeName: action(function(this: LocalStore, e: React.ChangeEvent<HTMLInputElement>) {
           this.name = e.target.value;
       }),
       onChangePassword: action(function(this: LocalStore, e: React.ChangeEvent<HTMLInputElement>) {
           this.password = e.target.value;
       }),
   }))

    const onLogIn = useCallback(() => {
        userStore.logIn({
            nickname: state.name,
            password: state.password,
        });
    }, [state.name, state.password])
    const onLogOut = useCallback(() => {
        userStore.logOut();
    }, [])
    return useObserver(() => (
        <div>
            {userStore.isLoggingIn
                ? <div>로그인 중</div>
                : userStore.data
                    ? <div>{userStore.data.nickname}</div>
                    : '로그인 해주세요.'}
            {!userStore.data
                ? <button onClick={onLogIn}>로그인</button>
                : <button onClick={onLogOut}>로그아웃</button>}
            <div>
                <input value={state.name} onChange={state.onChangeName}/>
                <input value={state.password} type="password" onChange={state.onChangePassword}/>
            </div>
        </div>
    ));
};

export default AppHook;