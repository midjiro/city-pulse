import React from 'react';

export const PostExcerpt = ({ author, title, content }) => {
    return (
        <article className='post'>
            <header className='post__header'>
                <img
                    src={author?.picture}
                    alt=''
                    className='post__user-picture avatar'
                />
                <a href={`/user/${author._id}`} className='post__user-link'>
                    {author.displayName}
                </a>
            </header>
            <div className='post__content'>
                <h2 className='post__title'>{title}</h2>
                <p className='post__text'>
                    {content.length > 100
                        ? content.substr(0, 100) + '...'
                        : content}
                </p>
            </div>
        </article>
    );
};
