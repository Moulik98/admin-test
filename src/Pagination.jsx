import React from "react";
const Pagination = ({ setCurrentPage, totalItems, pageSize, currentPage }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className='flex justify-end'>
            <div className='flex items-center border border-solid border-[#EEEEEE] rounded-md '>
                {pageNumbers.length ? <button
                    className='flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]'
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                </button> : null}

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        className={`flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]  ${page === currentPage ? 'bg-[#4285F4] text-white' : 'text-[#222222]'}`}
                        onClick={() => handlePageChange(page)}
                        disabled={page === currentPage}
                    >
                        {page}
                    </button>
                ))}

                {pageNumbers.length ? <button
                    className='flex justify-center items-center w-9 h-9 border-r border-solid border-[#EEEEEE]'
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>

                </button> : null}
            </div>
        </div>
    );
};
export default Pagination;