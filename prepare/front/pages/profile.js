import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST} from "../reducers/user";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { me } = useSelector((state) => state.user);
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);



    // useEffect(() => {
    //     if((me && me.id)) {
    //         dispatch({
    //             type: LOAD_FOLLOWERS_REQUEST,
    //         });
    //         dispatch({
    //             type: LOAD_FOLLOWINGS_REQUEST,
    //         });
    //     }
    // }, []);

    useEffect(() => {
        if(!(me && me.id)) {
            router.push("/");
        }
    }, [me && me.id]);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev + 3);
    }, [])
    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev + 3);
    }, [])

    if(!me) {
        return "내 정보 로딩중...";
    }

    // return이 훅스보다 먼저 올 순 없다.(훅스 개수가 보장되어야 함)
    if(followerError || followingError) {
        console.error(followerError || followingError);
        return "<div>팔로잉/팔로워 로딩 중 에러가 발생합니다.<div>";
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>프로필</title>
            </Head>
            <AppLayout>
                <NicknameEditForm/>
                <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError}/>
                <div>프로필 페이지</div>
            </AppLayout>
        </>
    )
}
export default Profile;