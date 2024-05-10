import { Link } from 'react-router-dom';

export const NotificationExcerpt = ({
    sender,
    publicationType,
    publicationID,
    msg,
}) => {
    const publicationLink =
        publicationType === 'event'
            ? `/event/${publicationID}`
            : `/post/${publicationID}`;

    return (
        <article className="excerpt modal__excerpt">
            <header className="author">
                <img
                    src={sender?.picture}
                    alt=""
                    className="avatar author__avatar"
                />
                <p className="author__name">
                    <Link
                        to={`/user/${sender._id}`}
                        className="author__profile-link"
                    >
                        {sender.displayName}
                    </Link>
                </p>
            </header>
            <p className="excerpt__text modal__excerpt-text">
                <Link to={publicationLink} className="excerpt__link">
                    {msg}
                </Link>
            </p>
        </article>
    );
};
