import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';

export const PostDetails = () => {
    const { postID } = useParams();
    const [post, _, pending] = useSelector((state) => [
        state.postReducer.posts.find((post) => post._id === postID),
        state.postReducer.error,
        state.postReducer.pending,
    ]);

    if (pending) return <h2>Loading...</h2>;

    return (
        <>
            <h2>{post.title}</h2>
            <p>Written by:</p>
            <section className='author'>
                <img
                    src={post.author?.picture}
                    alt=''
                    className='author__avatar avatar'
                />
                <a
                    href={`/user/${post.author._id}`}
                    className='author__profile-link'
                >
                    {post.author.displayName}
                </a>
            </section>
            <Markdown>{post.content}</Markdown>
        </>
    );
};
