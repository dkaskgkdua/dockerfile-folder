import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logIn} from "./actions/user";

const App = () => {
    const user = useSelector((state) => {state.user});
    const dispatch = useDispatch();
    const onClick = useCallback(() => {
        dispatch(logIn({
            id: 'mj',
            password: 'pw',
        }));
    }, []);
    return (
        <div>
            {user.isLoggingIn
                ? <div>로그인 중</div>
                    : user.data
                    ? <div>{user.nickname}</div>
                    : "로그인 해주세요."}
            {!user.data && <button onClick={onClick}>로그인</button>}
        </div>
    );
};

export default App;