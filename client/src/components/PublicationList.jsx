import React from 'react';
import { PublicationExcerpt } from './PublicationExcerpt';

const PublicationList = ({ publications }) => {
    return (
        <section className='publication-list'>
            {publications.map((publication) => (
                <PublicationExcerpt {...publication} key={publication._id} />
            ))}
        </section>
    );
};

export default PublicationList;
