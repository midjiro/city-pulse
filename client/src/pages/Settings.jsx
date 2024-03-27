import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAccount } from 'features/user/userAPI';

export const Settings = () => {
    const { user } = useOutletContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        control,
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            picture: user?.picture,
            displayName: user?.displayName,
        },
    });

    const handleAccountRemoved = () => {
        const isConfirmed = window.confirm(
            'Are you sure you want to delete an account?'
        );

        if (!isConfirmed) return;

        dispatch(removeAccount(user));

        navigate('/');
    };

    return (
        <div className='settings'>
            <h2>Profile Management</h2>
            <p>Make your profile more informative and readable for others</p>
            <h3>Public information</h3>
            <form
                action=''
                className='settings__form'
                onSubmit={handleSubmit((data) => console.log(data))}
                noValidate
            >
                <div className='form-control'>
                    <label htmlFor='picture' className='form-control__caption'>
                        Your Picture
                    </label>
                    <Controller
                        name='picture'
                        control={control}
                        render={({ field: { name, onChange } }) => (
                            <input
                                type='file'
                                name={name}
                                accept='image/*'
                                id='picture'
                                className='form-control__field'
                                onChange={({ target }) => {
                                    onChange(target.files.item(0));
                                }}
                            />
                        )}
                        rules={{
                            required: {
                                value: true,
                                message: 'This is required field.',
                            },
                        }}
                    />

                    <ErrorMessage
                        errors={errors}
                        name='picture'
                        as='p'
                        className='form-control__error'
                    />
                </div>
                <div className='form-control'>
                    <label
                        htmlFor='displayName'
                        className='form-control__caption'
                    >
                        Your Name
                    </label>
                    <input
                        type='text'
                        id='displayName'
                        className='form-control__field'
                        {...register('displayName', {
                            required: {
                                value: true,
                                message: 'This is required field.',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='displayName'
                        as='p'
                        className='form-control__error'
                    />
                </div>
                <button className='btn btn--success'>Update profile</button>
            </form>
            <h3>Additional actions</h3>
            <div>
                <button
                    className='btn btn--danger'
                    onClick={handleAccountRemoved}
                >
                    Remove an account
                </button>
            </div>
        </div>
    );
};
