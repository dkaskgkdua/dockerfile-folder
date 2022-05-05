import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST} from "../reducers/user";

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { me } = useSelector((state) => state.user);

    useEffect(() => {
        if((me && me.id)) {
            dispatch({
                type: LOAD_FOLLOWERS_REQUEST,
            });
            dispatch({
                type: LOAD_FOLLOWINGS_REQUEST,
            });
        }
    }, []);

    useEffect(() => {
        if(!(me && me.id)) {
            router.push("/");
        }
    }, [me && me.id]);
    if(!me) {
        return null;
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>프로필</title>
            </Head>
            <AppLayout>
                <NicknameEditForm/>
                <FollowList header="팔로잉" data={me.Followings}/>
                <FollowList header="팔로워" data={me.Followers}/>
                <div>프로필 페이지</div>
            </AppLayout>
        </>
    )
}
export default Profile;