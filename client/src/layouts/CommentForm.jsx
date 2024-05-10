import React, { useContext } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { addComment } from 'features/publication/publicationAPI';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SocketContext } from 'components/context/socket';
import { selectCurrentUser, selectSinglePublication } from 'features/selectors';
import { sendNotification } from 'features/notification/notificationsAPI';

export const CommentForm = ({ publicationID }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();
    const [user] = useSelector(selectCurrentUser);
    const [publication] = useSelector((state) =>
        selectSinglePublication(state, publicationID)
    );
    const socket = useContext(SocketContext);

    return (
        <form
            action=""
            className="comments__form"
            onSubmit={handleSubmit((data) =>
                dispatch(addComment({ publicationID, comment: data }))
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
