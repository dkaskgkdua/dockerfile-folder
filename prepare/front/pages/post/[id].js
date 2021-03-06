// post/[id].js
import { useRouter } from "next/router";
import wrapper from "../../store/configureStore";
import axios from "axios";
import {LOAD_MY_INFO_REQUEST} from "../../reducers/user";
import {LOAD_POST_REQUEST} from "../../reducers/post";
import {END} from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import {useSelector} from "react-redux";
import Head from "next/head";

const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    // if(router.isFallback) {
    //     return (<div>로딩중...</div>)
    // }

    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                    님의 글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost}/>
        </AppLayout>
    )
};

// 정적타입으로 미리 페이지를 만드는게 가능하지만 너무 제한적이라 잘 안씀...
// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: '1'}},
//             { params: { id: '2'}},
//             { params: { id: '3'}},
//         ],
//         fallback: true,
//     }
// }

// export const getStaticProps = wrapper.getStaticProps(async (context) => {


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = "";
    if(context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        // type: LOAD_USER_REQUEST,
        type: LOAD_MY_INFO_REQUEST,
    })

    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    })

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Post;

