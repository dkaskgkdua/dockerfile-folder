import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Profile = () => {
    const router = useRouter();
    const { me } = useSelector((state) => state.user);
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