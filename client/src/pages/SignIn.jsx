import { selectCurrentUser } from 'features/user/userReducer';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { initializeGoogleAuth, signIn } from 'features/user/userAPI';
import { FormField } from 'components/FormField';

export const SignIn = () => {
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
            <h2>Access Hub</h2>
            <p>Seamless Sign In for Your Convenience</p>
            <form
                action=''
                className='auth__form'
                onSubmit={handleSubmit((data) => {
                    dispatch(signIn(data));
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
                    <Link to='/sign-up/' className='link'>
                        have no account? Sign Up!
                    </Link>
                    <Link to='/recovery/' className='link'>
                        Forgot password?
                    </Link>
                </div>
                <button className='btn btn--success'>Sign In</button>
            </form>
            <div>
                <p>Alternative ways to sign in:</p>
                <button className='btn' onClick={initializeGoogleAuth}>
                    With google
                </button>
            </div>
        </section>
    );
};
