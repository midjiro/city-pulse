import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeAccount, updateAccountInformation } from 'features/user/userAPI';
import { FormField } from 'components/FormField';
import { FileFormField } from 'components/FileFormField';

export const ProfileSettings = () => {
    const { user } = useOutletContext();
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
                onSubmit={handleSubmit((data) =>
                    dispatch(updateAccountInformation(data))
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
