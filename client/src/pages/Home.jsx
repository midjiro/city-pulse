import PostList from 'components/PostList';
import { selectPostList } from 'features/post/postReducer';
import React from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
    const [posts, error, pending] = useSelector(selectPostList);
    if (pending) return <h2>Loading...</h2>;

    return <PostList posts={posts} />;
};
