import React, {FC} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {logIn, logOut, ThunkDispatch} from "./actions/user";
import {RootState} from "./reducers";
import { UserState} from './reducers/user'

const AppHook: FC = () => {
    const { isLoggingIn, data } = useSelector<RootState, UserState>((state) => state.user);
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(logIn({
            id: 'zerocho',
            password: '비밀번호',
        }))
    }
    const onLogout = () => {
        dispatch(logOut())
    }
    return (
        <div>
            {isLoggingIn
                ? <div>로그인 중</div>
                : data
                    ? <div>{data.nickname}</div>
                    : '로그인 해주세요.'}
            {!data
                ? <button onClick={onClick}>로그인</button>
                : <button onClick={onLogout}>로그아웃</button>}
        </div>
    )
};

export default AppHook;