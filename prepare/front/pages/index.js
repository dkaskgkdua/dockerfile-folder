import React, {useEffect} from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST, LOAD_MY_INFO_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
    useEffect(() => {
        if(retweetError) {
            alert(retweetError);
        }
    }, [retweetError]);

    useEffect(() => {
        function onScroll() {
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight - 300) {
                if(hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1]?.id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId
                    });
                }

            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [loadPostsLoading, hasMorePosts, mainPosts])


    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post, index) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
    );
};

// 접속할때마다 값이 바뀌지 않고 고정적일때 -> NEXT에서 HTML로 미리 파싱해놓음
// export const getStaticProps = wrapper.getStaticProps(async(context) => {
//     context.store.dispatch({
//         type: LOAD_USER_REQUEST,
//         data: 1,
//     });
//     context.store.dispatch(END);
//     await context.store.sagaTask.toPromise();
// })
// 접속할때마다 값이 가변적일때
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
        type: LOAD_POSTS_REQUEST
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Home;