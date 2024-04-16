import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from 'components/FormField';
import { MultilineFormField } from 'components/MultilineFormField';
import { useDispatch } from 'react-redux';
import { createEvent } from 'features/event/eventAPI';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const CreateEvent = () => {
    const { control, handleSubmit, reset } = useForm();

    const dispatch = useDispatch();

    return (
        <div className='event-form'>
            <form
                className='event-form__form'
                onSubmit={handleSubmit((data) => {
                    dispatch(createEvent(data))
                        .then(unwrapResult)
                        .then(() => {
                            toast('Event successfully published');
                            reset({ title: '', content: '' });
                        })
                        .catch((error) => toast(error.message));
                })}
                noValidate
            >
                <h2 className='event-form__title'>Create a New Event</h2>
                <div className='event-form__note'>
                    <p className='event-form__note-caption'>
                        Information to take into account:
                    </p>
                    <ul className='event-form__note-list'>
                        <li className='event-form__note-item'>
                            First 100 characters of event body will be used for
                            preview.
                        </li>
                    </ul>
                </div>

                <FormField
                    type='text'
                    name='title'
                    label='Event title'
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    control={control}
                />
                <FormField
                    type='datetime-local'
                    name='date'
                    label='Event date & time'
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    control={control}
                />
                <FormField
                    type='text'
                    name='location'
                    label='Event location'
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    control={control}
                />
                <MultilineFormField
                    name='content'
                    label='Event description'
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
                <button
                    type='submit'
                    className='btn btn--success event-form__btn'
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};
