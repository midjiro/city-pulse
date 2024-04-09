import React from 'react';
import { Link } from 'react-router-dom';

export const PostExcerpt = ({ _id, author, title, content }) => {
    return (
        <article className='post'>
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
            <div className='post__content'>
                <h2 className='post__title'>
                    <Link to={`/post/${_id}`}>{title}</Link>
                </h2>
                <p className='post__text'>
                    {content.length > 100
                        ? content.substr(0, 100) + '...'
                        : content}
                </p>
            </div>
        </article>
    );
};
