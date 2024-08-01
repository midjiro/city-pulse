import { useContext } from 'react';
import { UserContacts } from './UserContacts';
import { ProfileContext } from './Profile';

const SignOutButton = ({ isCurrentUser, onClick }) => {
    if (!isCurrentUser) return null;

    return (
        <button className="btn btn--danger" onClick={onClick}>
            Sign Out
        </button>
    );
};

export const UserInformation = () => {
    const {
        isCurrentUser,
        user: { picture, displayName, bio, phoneNumber, email },
        handleSignOut,
    } = useContext(ProfileContext);

    return (
        <section className="user">
            <div className="user__info">
                <img src={picture} alt="" className="avatar user__avatar" />
                <div className="user__details">
                    <h2 className="user__name">{displayName}</h2>
                    <p className="user__bio">{bio ? bio : ''}</p>
                </div>
            </div>
            <div className="user__actions">
                <UserContacts
                    isCurrentUser={isCurrentUser}
                    phoneNumber={phoneNumber}
                    email={email}
                />
                <SignOutButton
                    isCurrentUser={isCurrentUser}
                    onClick={handleSignOut}
                />
            </div>
        </section>
    );
};
