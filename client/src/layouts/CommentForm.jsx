import React, { useContext } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { addComment } from 'features/publication/publicationAPI';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SocketContext } from 'components/context/socket';
import { sendNotification } from 'features/notification/notificationsAPI';
import { CommentContext } from './Comments';

export const CommentForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { publication, user } = useContext(CommentContext);
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);

    if (!user) return null;

    return (
        <form
            action=""
            className="comments__form"
            onSubmit={handleSubmit((data) =>
                dispatch(
                    addComment({
                        publicationID: publication._id,
                        comment: data,
                    })
                )
                    .then(unwrapResult)
                    .then(() => toast('Comment added successfully'))
                    .then(() =>
                        sendNotification(
                            socket,
                            user,
                            'Commented your publication.',
                            publication
                        )
                    )
                    .catch((error) => toast(error))
            )}
            noValidate
        >
            <div className="form-control">
                <input
                    type="text"
                    className="form-control__field"
                    aria-invalid={errors?.content}
                    {...register('content', { required: true })}
                />
            </div>
            <button className="btn">Leave a comment</button>
        </form>
    );
};
