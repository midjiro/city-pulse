import React, { useState } from 'react';
import PublicationList from 'components/PublicationList';
import { useSelector } from 'react-redux';
import { Dropdown } from 'components/Dropdown';
import { Pagination } from 'components/Pagination';
import { usePagination } from 'hooks/pagination';

export const Home = () => {
    const [
        { posts, pending: postsPending },
        { events, pending: eventsPending },
    ] = useSelector((state) => [state.postReducer, state.eventReducer]);
    const [filter, setFilter] = useState('all');
    const filterOptions = {
        all: 'All',
        posts: 'Posts',
        events: 'Events',
    };

    const allPublications = [...posts, ...events];
    const publicationsPerPage = 3;

    const filteredPublications =
        filter === 'all'
            ? allPublications
            : filter === 'posts'
            ? posts
            : events;
    const {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        startIndex,
        endIndex,
    } = usePagination(filteredPublications.length, publicationsPerPage);
    const currentPublications = filteredPublications.slice(
        startIndex,
        endIndex + 1
    );

    if (postsPending || eventsPending) return <h2>Loading...</h2>;

    return (
        <section className='publications-preview'>
            <div className='publications-preview__header'>
                <h2 className='publications-preview__title'>
                    All publications
                </h2>
                <Dropdown title='Filter'>
                    {Object.entries(filterOptions).map(([key, option]) => (
                        <p
                            key={key}
                            className={
                                filter === key
                                    ? 'filter-option--active'
                                    : 'filter-option'
                            }
                            onClick={() => {
                                setFilter(key);
                                goToPage(1);
                            }}
                        >
                            {option}
                        </p>
                    ))}
                </Dropdown>
            </div>
            {filteredPublications.length === 0 ? (
                <p>There is nothing posted yet.</p>
            ) : (
                <PublicationList publications={currentPublications} />
            )}
            <Pagination
                onChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
                pages={totalPages}
                currentPage={currentPage}
            />
        </section>
    );
};
