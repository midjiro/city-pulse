import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { FormField } from 'components/FormField';
import { FileFormField } from 'components/FileFormField';
import { selectCurrentUser } from 'features/user/userReducer';
import { removeAccount, updateAccountInformation } from 'features/user/userAPI';

export const Settings = () => {
    const [user, pending] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm({
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

        dispatch(removeAccount(user))
            .then(unwrapResult)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (pending) return <h2>Loading</h2>;

    return (
        <div className='settings'>
            <h2>Profile Management</h2>
            <p>Make your profile more informative and readable for others</p>
            <h3>Public information</h3>
            <form
                action=''
                className='settings__form'
                onSubmit={handleSubmit((data) =>
                    dispatch(updateAccountInformation(data))
                        .then(unwrapResult)
                        .then(() => {
                            toast('Profile information updated successfully!');
                        })
                        .catch((error) => {
                            toast(error.message);
                        })
                )}
                noValidate
            >
                <FileFormField
                    type='file'
                    name='picture'
                    accept='image/*'
                    label='Your avatar'
                    control={control}
                />
                <FormField
                    type='text'
                    name='displayName'
                    label='Your username'
                    control={control}
                />
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
