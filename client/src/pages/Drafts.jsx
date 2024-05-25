import { DraftExcerpt } from 'components/excerpts/DraftExcerpt';
import { selectDraftList } from 'features/selectors';
import { useSelector } from 'react-redux';
import { usePagination } from 'hooks/pagination';
import { Pagination } from 'components/ui/Pagination';

export const Drafts = () => {
    const draftList = useSelector(selectDraftList);
    const draftsPerPage = 3;
    const {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        startIndex,
        endIndex,
    } = usePagination(draftList.length, draftsPerPage);
    const currentDrafts = draftList.slice(startIndex, endIndex + 1);

    if (draftList.length === 0)
        return (
            <section>
                <h2>Drafts</h2>
                <p>There are nothing added yet.</p>
            </section>
        );

    return (
        <section>
            <h2>Drafts</h2>
            <div className="publication-list">
                {currentDrafts.map((draft) => (
                    <DraftExcerpt {...draft} key={draft._id} />
                ))}
            </div>
            {draftList.length > draftsPerPage && (
                <Pagination
                    onChange={goToPage}
                    onNext={nextPage}
                    onPrev={prevPage}
                    pages={totalPages}
                    currentPage={currentPage}
                />
            )}
        </section>
    );
};
