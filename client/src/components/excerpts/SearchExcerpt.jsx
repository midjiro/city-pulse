import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const SearchExcerpt = ({ publication, onClick }) => {
    return (
        <article className="except modal__excerpt">
            <h3 className="excerpt__title modal__title">
                <Link
                    to={
                        publication.hasOwnProperty('location')
                            ? `/event/${publication._id}`
                            : `/post/${publication._id}`
                    }
                    onClick={onClick}
                    className="excerpt__link"
                    key={publication._id}
                >
                    {publication.title}
                </Link>
            </h3>

            <p className="date">
                Published at:{' '}
                {format(publication.publishedAt.toString(), 'PPPPp')}
            </p>
        </article>
    );
};
