import { useState } from 'react';

export const usePagination = (totalItems, itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToPage = (page) => {
        const pageNumber = Math.min(Math.max(1, page), totalPages);
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

    return {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        startIndex,
        endIndex,
    };
};
