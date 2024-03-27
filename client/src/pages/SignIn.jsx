import { selectCurrentUser } from 'features/user/userReducer';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { initializeGoogleAuth, signIn } from 'features/user/userAPI';

export const SignIn = () => {
    const [currentUser, pending] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

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
                <div className='form-control'>
                    <label htmlFor='email' className='form-control__caption'>
                        Your email
                    </label>
                    <input
                        type='email'
                        autoComplete='email'
                        className='form-control__field'
                        id='email'
                        aria-invalid={false}
                        {...register('email', { required: true })}
                    />
                    <ErrorMessage
                        errors={errors}
                        as='p'
                        className='form-control__error'
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='password' className='form-control__caption'>
                        Your password
                    </label>
                    <input
                        type='password'
                        autoComplete='current-password'
                        className='form-control__field'
                        id='password'
                        aria-invalid={false}
                        {...register('password', { required: true })}
                    />
                    <ErrorMessage
                        errors={errors}
                        as='p'
                        className='form-control__error'
                    />
                </div>
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
