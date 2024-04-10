import { selectFoundPostList } from 'features/post/postReducer';
import { selectFoundEventList } from 'features/event/eventReducer';
import React, { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const SearchModal = forwardRef((props, ref) => {
    const [searchQuery, setSearchQuery] = useState('');

    const posts = useSelector((state) =>
        selectFoundPostList(state, searchQuery)
    );
    const events = useSelector((state) =>
        selectFoundEventList(state, searchQuery)
    );

    const handleSearch = ({ target: field }) => {
        setSearchQuery(field.value.toLowerCase());
    };
    const handleClose = () => {
        ref.current.close();
    };

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
                    <h3 className='search-modal__results-title'>Posts</h3>
                    {posts.length === 0 ? (
                        <p>No publications found</p>
                    ) : (
                        <div className='search-modal__results'>
                            {posts.map((post) => (
                                <Link
                                    to={`/post/${post._id}`}
                                    className='search-modal__results-link'
                                    key={post._id}
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    {post.title}
                                </Link>
                            ))}
                        </div>
                    )}
                    <h3 className='search-modal__results-title'>Events</h3>
                    {events.length === 0 ? (
                        <p>No publications found</p>
                    ) : (
                        <div className='search-modal__results'>
                            {events.map((event) => (
                                <Link
                                    to={`/post/${event._id}`}
                                    className='search-modal__results-link'
                                    key={event._id}
                                    onClick={() => {
                                        handleClose();
                                    }}
                                >
                                    {event.title}
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </dialog>
    );
});
