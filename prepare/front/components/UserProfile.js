import {Avatar, Button, Card} from "antd";
import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logoutRequestAction} from "../reducers/user";
import Link from "next/link";

const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state) => state.user);
    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
    }, []);
    return (
        <Card
            actions={[
                <div key="twit">짹쨱<br />{me.Posts.length}</div>,
                <div key="followings">팔로잉<br />{me.Followings.length}</div>,
                <div key="follower">팔로워<br />{me.Followers.length}</div>,
            ]}
        >
            <Card.Meta
                avatar={(
                    <Link href={`/user/${me.id}`}>
                        <a><Avatar>{me.nickname[0]}</Avatar></a>
                    </Link>
                )}
                title={me.nickname}
            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;