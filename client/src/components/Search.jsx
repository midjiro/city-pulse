import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectPublicationsByTitle } from 'features/selectors';

export const SearchModal = forwardRef((props, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [publications, pending] = useSelector((state) =>
        selectPublicationsByTitle(state, searchQuery)
    );

    const handleSearch = ({ target: field }) => {
        setSearchQuery(field.value.toLowerCase());
    };
    const handleClose = () => {
        ref.current.close();
    };

    if (pending) return <h2>Loading...</h2>;

    return (
        <dialog className='search-modal' ref={ref}>
            <div className='search-modal__header'>
                <h2 className='search-modal__title'>Search for publications</h2>
                <button
                    className='search-modal__close-btn'
                    onClick={handleClose}
                >
                    <i className='fa-solid fa-xmark fa-xl'></i>
                    <span className='sr-only'>Close</span>
                </button>
            </div>
            <div className='search-modal__content'>
                <div className='form-control'>
                    <input
                        type='text'
                        className='form-control__field'
                        onChange={handleSearch}
                    />
                </div>
                <section>
                    <h3 className='search-modal__results-title'>
                        Publications found
                    </h3>
                    {publications.length === 0 ? (
                        <p>No publications found</p>
                    ) : (
                        <div className='search-modal__results'>
                            {publications.map((publication) => {
                                if (publication.hasOwnProperty('location'))
                                    return (
                                        <Link
                                            to={`/event/${publication._id}`}
                                            className='search-modal__results-link'
                                            key={publication._id}
                                            onClick={() => {
                                                handleClose();
                                            }}
                                        >
                                            {publication.title}
                                        </Link>
                                    );

                                return (
                                    <Link
                                        to={`/post/${publication._id}`}
                                        className='search-modal__results-link'
                                        key={publication._id}
                                        onClick={() => {
                                            handleClose();
                                        }}
                                    >
                                        {publication.title}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </dialog>
    );
});
