import { selectCurrentUser } from 'features/user/userReducer';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { initializeGoogleAuth, signUp } from 'features/user/userAPI';

export const SignUp = () => {
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
            <h2>Join the Community</h2>
            <p>Register Now to Unlock Endless Possibilities</p>
            <form
                action=''
                className='auth__form'
                onSubmit={handleSubmit((data) => {
                    dispatch(signUp(data));
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
                        aria-invalid={errors.email ? true : false}
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'This is required field',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='email'
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
                        aria-invalid={errors.password ? true : false}
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'This is required field',
                            },
                        })}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='password'
                        as='p'
                        className='form-control__error'
                    />
                </div>
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
