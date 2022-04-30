import React, {useEffect} from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import {useDispatch, useSelector} from "react-redux";
import PostCard from "../components/PostCard";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_USER_REQUEST,
        })
        dispatch({
            type: LOAD_POSTS_REQUEST
        });
    }, []);

    useEffect(() => {
        function onScroll() {
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
            if(window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight - 300) {
                console.log("ㅎㅎ");
                if(hasMorePosts && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                    });
                }

            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [loadPostsLoading, hasMorePosts])


    return (
        <AppLayout>
            {me && <PostForm />}
            {mainPosts.map((post, index) => <PostCard key={post.id} post={post}/>)}
        </AppLayout>
    );
};
export default Home;