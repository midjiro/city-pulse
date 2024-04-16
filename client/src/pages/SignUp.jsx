import { selectCurrentUser } from 'features/user/userReducer';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initializeGoogleAuth, signUp } from 'features/user/userAPI';
import { FormField } from 'components/FormField';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const SignUp = () => {
    const [currentUser, pending] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm();

    useEffect(() => {
        if (currentUser) navigate('/');
    }, [currentUser]);

    if (pending) return <h2>Loading...</h2>;

    return (
        <section className='auth'>
            <h2>Join the Community</h2>
            <p>Register Now to Unlock Endless Possibilities</p>
            <form
                action=''
                className='auth__form'
                onSubmit={handleSubmit((data) => {
                    dispatch(signUp(data))
                        .then(unwrapResult)
                        .catch((error) => {
                            toast(error.message);
                        });
                })}
                noValidate
            >
                <FormField
                    control={control}
                    type='email'
                    name='email'
                    autocomplete='email'
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    label='Your email'
                />
                <FormField
                    control={control}
                    type='password'
                    name='password'
                    autocomplete='current-password'
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    label='Your password'
                />
                <div className='auth__additional-links'>
                    <Link to='/sign-in/' className='link'>
                        Already have an account? Sign In!
                    </Link>
                </div>
                <button className='btn btn--success'>Sign Up</button>
            </form>
            <div>
                <p>Alternative ways to sign up:</p>
                <button className='btn' onClick={initializeGoogleAuth}>
                    With google
                </button>
            </div>
        </section>
    );
};
