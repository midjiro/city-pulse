import React from 'react';
import { EventExcerpt } from './EventExcerpt';
import { PostExcerpt } from './PostExcerpt';

const PublicationList = ({ publications }) => {
    return (
        <section className='publication-list'>
            {publications.map((publication) =>
                publication.hasOwnProperty('location') ? (
                    <EventExcerpt {...publication} key={publication._id} />
                ) : (
                    <PostExcerpt {...publication} key={publication._id} />
                )
            )}
        </section>
    );
};

export default PublicationList;
