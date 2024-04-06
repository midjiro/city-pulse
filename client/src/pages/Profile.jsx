import { Navbar } from 'components/Navbar';
import { signOut } from 'features/user/userAPI';
import { selectCurrentUser } from 'features/user/userReducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

export const Profile = () => {
    const [user, pending] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOut(user));
        navigate('/');
    };

    if (pending)
        return (
            <main className='container'>
                <Navbar />
                <h2>Loading...</h2>
            </main>
        );

    return (
        <main className='container'>
            <Navbar />
            <section className='profile'>
                <section className='user'>
                    <div>
                        <img
                            src={user?.picture}
                            alt=''
                            className='avatar user__avatar'
                        />
                        <h2 className='user__name'>{user.displayName}</h2>
                        <div className='user__popularity'>
                            <p className='user__statistic'>Posts 0</p>
                            <p className='user__statistic'>
                                Followers {user.followers.length}
                            </p>
                            <p className='user__statistic'>
                                Following {user.following.length}
                            </p>
                        </div>
                    </div>
                    <div className='user__actions'>
                        <button
                            className='btn btn--danger'
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </section>
                <Outlet context={{ user }} />
            </section>
        </main>
    );
};
