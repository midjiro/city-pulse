import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const SearchExcerpt = ({ publication, type, onClick }) => {
    return (
        <article className='publication search-modal__publication'>
            <h3 className='publication__title search-modal__title'>
                <Link
                    to={
                        type === 'event'
                            ? `/event/${publication._id}`
                            : `/post/${publication._id}`
                    }
                    key={publication._id}
                    onClick={onClick}
                >
                    {publication.title}
                </Link>
            </h3>

            <p className='date'>
                {type === 'event'
                    ? `Scheduled for: ${format(
                          publication.date.toString(),
                          'PPPPp'
                      )} `
                    : `Published at: ${format(
                          publication.publishedAt.toString(),
                          'PPPPp'
                      )}`}
            </p>
        </article>
    );
};
