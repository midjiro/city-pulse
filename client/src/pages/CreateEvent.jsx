import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from 'components/form/FormField';
import { MultilineFormField } from 'components/form/MultilineFormField';
import { useDispatch } from 'react-redux';
import { createEvent } from 'features/publication/publicationAPI';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { GeolocationFormField } from 'components/form/GeolocationFormField';
import Markdown from 'react-markdown';

export const CreateEvent = () => {
    const { control, handleSubmit, reset, watch } = useForm();
    const dispatch = useDispatch();
    const title = watch('title');
    const content = watch('content');

    return (
        <div className="form__container">
            <form
                className="form"
                onSubmit={handleSubmit((data) => {
                    dispatch(createEvent(data))
                        .then(unwrapResult)
                        .then(() => {
                            toast('Event successfully published');
                            reset({ title: '', content: '' });
                        })
                        .catch((error) => toast(error));
                })}
                noValidate
            >
                <h2 className="form__title">Create a New Event</h2>
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
                    label="Event title"
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    control={control}
                />
                <FormField
                    type="datetime-local"
                    name="scheduledFor"
                    label="Event date & time"
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    control={control}
                />
                <GeolocationFormField
                    type="text"
                    name="location"
                    label="Event location"
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
                    label="Event description"
                    rows={5}
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                        maxLength: {
                            value: 1500,
                            message:
                                'Event body must be at most 1500 character length.',
                        },
                    }}
                    maxLength={1500}
                    control={control}
                />
                <button type="submit" className="btn btn--success form__btn">
                    Create Event
                </button>
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
