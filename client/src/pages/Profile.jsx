import React from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ProfilePublications } from './ProfilePublications';
import { signOut } from 'features/user/userAPI';
import { selectCurrentUser } from 'features/user/userReducer';
import { useUserInfo } from 'hooks/user';

export const Profile = () => {
    const { userID } = useParams();
    const [currentUser, currentUserPending] = useSelector(selectCurrentUser);
    const { user, error, pending: userPending } = useUserInfo(userID);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(signOut(currentUser._id))
            .then(unwrapResult)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (currentUserPending || userPending) return <h2>Loading...</h2>;
    else if (!user || error) {
        return (
            <>
                <h2>Unable to load profile information.</h2>
                <p>
                    {error
                        ? error
                        : 'We are unable to load profile information. Try to reload page.'}
                </p>
            </>
        );
    }

    const isCurrentUser = currentUser?._id === user?._id;

    return (
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
                {isCurrentUser && (
                    <div className='user__actions'>
                        <button
                            className='btn btn--danger'
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </section>
            <ProfilePublications user={isCurrentUser ? currentUser : user} />
        </section>
    );
};
