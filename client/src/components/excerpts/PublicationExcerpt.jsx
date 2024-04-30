import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const PublicationExcerpt = ({
    _id,
    author,
    publishedAt,
    location,
    title,
    content,
}) => {
    return (
        <article className='publication'>
            <header className='author'>
                <img
                    src={author?.picture}
                    alt=''
                    className='author__avatar avatar'
                />
                <a
                    href={`/user/${author._id}`}
                    className='author__profile-link'
                >
                    {author.displayName}
                </a>
            </header>
            <div className='publication__content'>
                <h2 className='publication__title'>
                    <Link to={location ? `/event/${_id}` : `/post/${_id}`}>
                        {title}
                    </Link>
                </h2>
                <p className='date'>
                    Published at: {format(publishedAt.toString(), 'PPPPp')}
                </p>
                <p className='publication__text'>
                    {content.length > 100
                        ? content.substr(0, 100) + '...'
                        : content}
                </p>
            </div>
        </article>
    );
};
