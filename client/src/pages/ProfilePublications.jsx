import React from 'react';
import { useSelector } from 'react-redux';
import PublicationList from 'layouts/PublicationList';
import { Pagination } from 'components/ui/Pagination';
import { usePagination } from 'hooks/pagination';
import { selectPublicationsByUser } from 'features/selectors';

export const ProfilePublications = ({ user }) => {
    const [publications, pending] = useSelector((state) =>
        selectPublicationsByUser(state, user)
    );
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

    if (pending) return <h2>Loading...</h2>;

    return (
        <>
            <h2>All publications</h2>
            {publications.length === 0 ? (
                <p>There are nothing published yet.</p>
            ) : (
                <>
                    <PublicationList publications={currentPublications} />
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
        </>
    );
};
