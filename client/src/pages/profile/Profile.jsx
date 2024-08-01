import React, { createContext, useMemo } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { signOut } from 'features/user/userAPI';
import { selectCurrentUser } from 'features/selectors';
import { useUserInfo } from 'hooks/user';
import { UserPublications } from './UserPublications';
import { UserInformation } from './UserInformation';

export const ProfileContext = createContext(null);

export const Profile = () => {
    const { userID } = useParams();
    const [currentUser, currentUserPending] = useSelector(selectCurrentUser);
    const { user, error, pending: userPending } = useUserInfo(userID);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isCurrentUser = useMemo(
        () => currentUser?._id === user?._id,
        [currentUser, user]
    );

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

    if (userPending || currentUserPending) return <h2>Loading...</h2>;
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

    return (
        <section className="profile">
            <ProfileContext.Provider
                value={{ isCurrentUser, handleSignOut, user }}
            >
                <UserInformation />
                <UserPublications />
            </ProfileContext.Provider>
        </section>
    );
};
