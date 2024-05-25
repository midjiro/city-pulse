import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initializeGoogleAuth, signIn } from 'features/user/userAPI';
import { FormField } from 'components/form/FormField';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const SignIn = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { handleSubmit, control } = useForm();

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    return (
        <section className="auth">
            <h2>Access Hub</h2>
            <p>Seamless Sign In for Your Convenience</p>
            <form
                action=""
                className="auth__form"
                onSubmit={handleSubmit((data) => {
                    dispatch(signIn(data))
                        .then(unwrapResult)
                        .catch((error) => {
                            toast(error);
                        });
                })}
                noValidate
            >
                <FormField
                    control={control}
                    type="email"
                    name="email"
                    autocomplete="email"
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    label="Your email"
                />
                <FormField
                    control={control}
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    rules={{
                        required: {
                            value: true,
                            message: 'This is required field.',
                        },
                    }}
                    label="Your password"
                />
                <div className="auth__additional-links">
                    <Link to="/sign-up/" className="link">
                        Have no account? Sign Up!
                    </Link>
                </div>
                <button className="btn btn--success">Sign In</button>
            </form>
            <div>
                <p>Alternative ways to sign in:</p>
                <button className="btn" onClick={initializeGoogleAuth}>
                    With google
                </button>
            </div>
        </section>
    );
};
