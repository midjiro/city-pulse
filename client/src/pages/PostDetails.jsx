import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { selectCurrentUser } from 'features/selectors';
import { deletePublication } from 'features/publication/publicationAPI';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectSinglePublication } from 'features/selectors';

export const PostDetails = () => {
    const { publicationID } = useParams();
    const [post, postPending] = useSelector((state) =>
        selectSinglePublication(state, publicationID)
    );
    const [user, userPending] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (postPending || userPending) return <h2>Loading...</h2>;
    else if (!post)
        return (
            <>
                <h2>Oops! We are unable to find post you are looking for</h2>
                <p>It might be removed or updated.</p>
            </>
        );

    return (
        <>
            <h2>{post.title}</h2>
            <p> {format(post.publishedAt.toString(), 'PPPPp')}</p>
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
            {user?._id === post.author._id && (
                <button
                    className='btn btn--danger'
                    onClick={() => {
                        dispatch(deletePublication(post._id))
                            .then(unwrapResult)
                            .then(() => {
                                navigate('/');
                            })
                            .catch((error) => {
                                toast(error.message);
                            });
                    }}
                >
                    Delete
                </button>
            )}
        </>
    );
};
