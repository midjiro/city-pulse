import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const PublicationExcerpt = ({
    _id,
    author,
    publishedAt,
    location,
    title,
}) => {
    return (
        <article className="excerpt">
            <header className="author">
                <img
                    src={author?.picture}
                    alt=""
                    className="author__avatar avatar"
                />
                <a
                    href={`/user/${author._id}`}
                    className="author__profile-link"
                >
                    {author.displayName}
                </a>
            </header>
            <div className="excerpt__content">
                <h2 className="excerpt__title">
                    <Link
                        to={location ? `/event/${_id}` : `/post/${_id}`}
                        className="excerpt__link"
                    >
                        {title}
                    </Link>
                </h2>
                <p className="date">
                    Published at: {format(publishedAt.toString(), 'PPPPp')}
                </p>
            </div>
        </article>
    );
};
