import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormField } from 'components/form/FormField';
import { MultilineFormField } from 'components/form/MultilineFormField';
import Markdown from 'react-markdown';
import { createPost } from 'features/publication/publicationAPI';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addDraft } from 'features/drafts/draftsSlice';

export const CreatePost = () => {
    const { control, handleSubmit, watch, reset } = useForm();
    const dispatch = useDispatch();

    const title = watch('title');
    const content = watch('content');

    return (
        <div className="form__container">
            <form
                className="form"
                onSubmit={handleSubmit((data) => {
                    dispatch(createPost(data))
                        .then(unwrapResult)
                        .then(() => {
                            toast('Post successfully published');
                            reset({ title: '', content: '' });
                        })
                        .catch((error) => {
                            toast(error);
                        });
                })}
                noValidate
            >
                <h2 className="form__title">Create a New Post</h2>
                <div className="form__note">
                    <p className="form__note-caption">
                        Information to take into account:
                    </p>
                    <ul className="form__note-list">
                        <li className="form__note-item">
                            Instead of ordinary text{' '}
                            <a href="https://www.markdownguide.org/">markup</a>{' '}
                            might be used.
                        </li>
                    </ul>
                </div>

                <FormField
                    type="text"
                    name="title"
                    label="Post title"
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    control={control}
                />
                <MultilineFormField
                    name="content"
                    label="Post body"
                    rows={5}
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                        maxLength: {
                            value: 1500,
                            message:
                                'Post body must be at most 1500 character length.',
                        },
                    }}
                    maxLength={1500}
                    control={control}
                />
                <div className="form__actions">
                    <button
                        type="submit"
                        className="btn btn--success form__btn"
                    >
                        Create Post
                    </button>
                    <button
                        className="btn form__btn"
                        onClick={handleSubmit((data) => {
                            dispatch(addDraft(data));
                            toast('Publication was saved as draft.');
                            reset({ title: '', content: '' });
                        })}
                    >
                        Save as Draft
                    </button>
                </div>
            </form>
            <div className="preview">
                <h2 className="preview__title">Preview</h2>
                <div>
                    <h3>{title ? title : 'Title preview'}</h3>
                    <Markdown className="preview__content">
                        {content ? content : 'Content Preview'}
                    </Markdown>
                </div>
            </div>
        </div>
    );
};
