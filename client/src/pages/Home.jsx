import React from 'react';
import PublicationList from 'layouts/PublicationList';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'components/ui/Dropdown';
import { Pagination } from 'components/ui/Pagination';
import { usePagination } from 'hooks/pagination';
import { filterActions } from 'features/filter/filterSlice';
import { selectFilter } from 'features/selectors';
import { selectPublicationsByFilter } from 'features/selectors';

export const Home = () => {
    const [publications, pending] = useSelector(selectPublicationsByFilter);
    const filter = useSelector(selectFilter);
    const filterOptions = {
        all: 'All',
        posts: 'Posts',
        events: 'Events',
    };

    const publicationsPerPage = 3;

    const {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        startIndex,
        endIndex,
    } = usePagination(publications.length, publicationsPerPage);
    const currentPublications = publications.slice(startIndex, endIndex + 1);
    const dispatch = useDispatch();

    if (pending) return <h2>Loading...</h2>;

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
                                dispatch(filterActions.set(key));
                                goToPage(1);
                            }}
                        >
                            {option}
                        </p>
                    ))}
                </Dropdown>
            </div>
            {publications.length === 0 ? (
                <p>There is nothing posted yet.</p>
            ) : (
                <>
                    <PublicationList
                        publications={
                            publications.length > publicationsPerPage
                                ? currentPublications
                                : publications
                        }
                    />
                    {publications.length > publicationsPerPage && (
                        <Pagination
                            onChange={goToPage}
                            onNext={nextPage}
                            onPrev={prevPage}
                            pages={totalPages}
                            currentPage={currentPage}
                        />
                    )}
                </>
            )}
        </section>
    );
};
