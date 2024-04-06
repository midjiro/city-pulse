import React from 'react';
import { PostExcerpt } from './PostExcerpt';

const PostList = ({ posts }) => {
    return (
        <section className='post-list'>
            {posts.map((post) => (
                <PostExcerpt {...post} key={post._id} />
            ))}
        </section>
    );
};

export default PostList;
