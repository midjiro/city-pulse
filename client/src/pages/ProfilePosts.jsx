import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostList from 'components/PostList';
import { selectUserPostList } from 'features/post/postReducer';

export const ProfilePosts = () => {
    const { user } = useOutletContext();
    const [posts, _, pending] = useSelector((state) =>
        selectUserPostList(state, user)
    );

    if (pending) return <h1>Loading...</h1>;

    return (
        <>
            <h2>All Posts</h2>
            <PostList posts={posts} />
        </>
    );
};
