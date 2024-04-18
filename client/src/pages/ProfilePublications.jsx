import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicationList from 'components/PublicationList';
import { usePagination } from 'hooks/pagination';
import { Pagination } from 'components/Pagination';

export const ProfilePublications = () => {
    const { user } = useOutletContext();
    const [allPublications, pending] = useSelector((state) => [
        [
            ...state.postReducer.posts.filter(
                (item) => item.author._id === user._id
            ),
            ...state.eventReducer.events.filter(
                (item) => item.author._id === user._id
            ),
        ],
        state.postReducer.pending || state.eventReducer.pending,
    ]);
    const publicationsPerPage = 3;
    const {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        startIndex,
        endIndex,
    } = usePagination(allPublications.length, publicationsPerPage);

    const currentPublications = allPublications.slice(startIndex, endIndex + 1);

    if (pending) return <h2>Loading...</h2>;

    return (
        <>
            <h2>All publications</h2>
            {allPublications.length === 0 ? (
                <p>There are nothing published by you</p>
            ) : (
                <>
                    <PublicationList publications={currentPublications} />
                    {allPublications.length > publicationsPerPage && (
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
        </>
    );
};
