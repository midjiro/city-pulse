import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { addComment } from 'features/publication/publicationAPI';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const CommentForm = ({ publicationID }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const dispatch = useDispatch();

    return (
        <form
            action=''
            className='comments__form'
            onSubmit={handleSubmit((data) =>
                dispatch(addComment({ publicationID, comment: data }))
                    .then(unwrapResult)
                    .then(() => toast('Comment added successfully'))
                    .catch((error) => toast(error))
            )}
            noValidate
        >
            <div className='form-control'>
                <input
                    type='text'
                    className='form-control__field'
                    aria-invalid={errors?.content}
                    {...register('content', { required: true })}
                />
            </div>
            <button className='btn'>Leave a comment</button>
        </form>
    );
};
