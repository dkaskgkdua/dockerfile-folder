import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";

const Profile = () => {
    const followerList = [{ nickname: "제로초"}, { nickname: "바보"}, { nickname: "노드버드오피셜"}, ];
    const followingList = [{ nickname: "제로초"}, { nickname: "바보"}, { nickname: "노드버드오피셜"}, ];
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>프로필</title>
            </Head>
            <AppLayout>
                <NicknameEditForm/>
                <FollowList header="팔로잉 목록" data={followingList}/>
                <FollowList header="팔로워 목록" data={followerList}/>
                <div>프로필 페이지</div>
            </AppLayout>
        </>
    )
}
export default Profile;