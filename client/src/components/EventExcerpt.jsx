import React from 'react';
import { Link } from 'react-router-dom';

export const EventExcerpt = ({ _id, author, title, content }) => {
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
                    <Link to={`/event/${_id}`}>{title}</Link>
                </h2>
                <p className='publication__text'>
                    {content.length > 100
                        ? content.substr(0, 100) + '...'
                        : content}
                </p>
            </div>
        </article>
    );
};
