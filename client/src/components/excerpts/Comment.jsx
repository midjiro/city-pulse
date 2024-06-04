import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteComment } from 'features/publication/publicationAPI';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { CommentContext } from 'layouts/Comments';

export const Comment = ({ id: commentID, commentAuthor, content }) => {
    const { publication, user } = useContext(CommentContext);

    const dispatch = useDispatch();
    const handleDelete = (commentID) => {
        dispatch(deleteComment({ publicationID: publication._id, commentID }))
            .then(unwrapResult)
            .then(() => toast('Comment removed successfully'))
            .catch((error) => toast(error));
    };

    if (!commentAuthor) return null;

    const isAuthorized = (user, publicationAuthor, commentAuthor) => {
        if (!commentAuthor || !user) return false;

        return [
            commentAuthor._id.toString(),
            publicationAuthor._id.toString(),
        ].includes(user._id.toString());
    };

    return (
        <article className="comment">
            <div className="author comment__author">
                <img
                    src={commentAuthor?.picture}
                    alt=""
                    className="avatar author__avatar"
                />
                <p className="author__name">
                    <Link
                        to={`/user/${commentAuthor._id}`}
                        className="author__profile-link"
                    >
                        {commentAuthor.displayName}
                    </Link>
                </p>
            </div>
            <p>{content}</p>
            {isAuthorized(user, publication.author, commentAuthor) && (
                <button
                    className="btn btn--danger"
                    onClick={() => handleDelete(commentID)}
                >
                    Remove
                </button>
            )}
        </article>
    );
};
