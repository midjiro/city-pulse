import React from 'react';

const PublicationList = ({ publications, wrapper }) => {
    const Publication = wrapper;

    return (
        <section className='publication-list'>
            {publications.map((publication) => (
                <Publication {...publication} key={publication._id} />
            ))}
        </section>
    );
};

export default PublicationList;
