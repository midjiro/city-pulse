import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPublicationsByTitle } from 'features/selectors';
import { SearchExcerpt } from './SearchExcerpt';

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

    if (!pending)
        return (
            <dialog className='search-modal' ref={ref}>
                <div className='search-modal__header'>
                    <h2 className='search-modal__header-title'>
                        Search for publications
                    </h2>
                    <button
                        className='btn search-modal__btn'
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
                                            <SearchExcerpt
                                                publication={publication}
                                                type='event'
                                                onClick={handleClose}
                                                key={publication._id}
                                            />
                                        );

                                    return (
                                        <SearchExcerpt
                                            publication={publication}
                                            type='post'
                                            onClick={handleClose}
                                            key={publication._id}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </dialog>
        );
});
