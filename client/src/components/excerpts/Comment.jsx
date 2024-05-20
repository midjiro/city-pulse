import React from 'react';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteComment } from 'features/publication/publicationAPI';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export const Comment = ({
    publicationID,
    publicationAuthor,
    _id: commentID,
    by,
    content,
    user,
}) => {
    const dispatch = useDispatch();
    const handleDelete = (commentID) => {
        dispatch(deleteComment({ publicationID, commentID }))
            .then(unwrapResult)
            .then(() => toast('Comment removed successfully'))
            .catch((error) => toast(error));
    };
    const isAuthorized = [
        by._id.toString(),
        publicationAuthor._id.toString(),
    ].includes(user._id.toString());

    return (
        <article className="comment">
            <div className="author comment__author">
                <img
                    src={by?.picture}
                    alt=""
                    className="avatar author__avatar"
                />
                <p className="author__name">
                    <Link
                        to={`/user/${by._id}`}
                        className="author__profile-link"
                    >
                        {by.displayName}
                    </Link>
                </p>
            </div>
            <p>{content}</p>
            {isAuthorized && (
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
