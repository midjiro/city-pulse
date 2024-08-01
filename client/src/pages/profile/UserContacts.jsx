import { useContext } from 'react';
import { ProfileContext } from './Profile';

const CallButton = ({ phoneNumber }) => {
    if (!phoneNumber) return null;

    return (
        <a href={`tel:${phoneNumber}`} className="btn user__contact-link">
            Call
        </a>
    );
};

const EmailButton = ({ email }) => {
    if (!email) return null;

    return (
        <a href={`mailto:${email}`} className="btn user__contact-link">
            Send an email
        </a>
    );
};

export const UserContacts = () => {
    const {
        isCurrentUser,
        user: { phoneNumber, email },
    } = useContext(ProfileContext);

    if (isCurrentUser) return null;

    return (
        <div>
            <h3>Contact</h3>
            <div className="user__contact-info">
                <CallButton phoneNumber={phoneNumber} />
                <EmailButton email={email} />
            </div>
        </div>
    );
};
