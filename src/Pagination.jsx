import React from "react";

const Pagination = ({ setCurrentPage, totalItems, pageSize, currentPage }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderEllipsis = () => {
    return <span className="px-2">...</span>;
  };

  const renderPageNumbers = () => {
    const adjacentPages = 2; // Number of adjacent pages to show on each side of the current page.
    const visiblePages = adjacentPages * 2 + 1; // Total visible pages including ellipses.

    let startPage = Math.max(currentPage - adjacentPages, 1);
    let endPage = Math.min(currentPage + adjacentPages, totalPages);

    if (totalPages <= visiblePages) {
      // If there are not enough pages to display ellipses, show all page numbers.
      startPage = 1;
      endPage = totalPages;
    } else {
      // If there are too many pages, adjust startPage and endPage.
      const pagesBefore = currentPage - 1;
      const pagesAfter = totalPages - currentPage;

      if (pagesBefore <= adjacentPages) {
        endPage = visiblePages - 2; // Adjust endPage to show more pages after ellipsis.
      } else if (pagesAfter <= adjacentPages) {
        startPage = totalPages - visiblePages + 3; // Adjust startPage to show more pages before ellipsis.
      }
    }

    const pageLinks = [];
    for (let page = startPage; page <= endPage; page++) {
      pageLinks.push(
        <button
          key={page}
          className={`flex justify-center items-center w-9 h-9 border-r shadow-lg border-solid border-[#dbdada] rounded-full ${
            page === currentPage ? "bg-[#4285F4] text-white" : "text-[#222222]"
          }`}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      );
    }

    if (startPage > 1) {
      pageLinks.unshift(renderEllipsis());
      pageLinks.unshift(
        <button
          key={1}
          className={`flex justify-center items-center w-9 h-9  border-solid border-r border-[#dbdada] shadow-lg rounded-full ${
            1 === currentPage ? "bg-[#4285F4] text-white" : "text-[#222222]"
          }`}
          onClick={() => handlePageChange(1)}
          disabled={1 === currentPage}
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      pageLinks.push(renderEllipsis());
      pageLinks.push(
        <button
          key={totalPages}
          className={`flex justify-center items-center w-9 h-9 border-r border-solid border-[#dbdada] shadow-lg rounded-full ${
            totalPages === currentPage
              ? "bg-[#4285F4] text-white"
              : "text-[#222222]"
          }`}
          onClick={() => handlePageChange(totalPages)}
          disabled={totalPages === currentPage}
        >
          {totalPages}
        </button>
      );
    }

    return pageLinks;
  };

  return (
    <div className="flex justify-end">
      <div className="flex items-center space-x-3 ">
        {currentPage > 1 ? (
          <button
            className="flex justify-center items-center w-9 h-9 border-r border-solid border-[#dbdada] shadow-lg rounded-full"
            onClick={handlePreviousPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        ) : null}

        {renderPageNumbers()}

        {currentPage < totalPages ? (
          <button
            className="flex justify-center items-center w-9 h-9 border-r border-solid border-[#dbdada] shadow-lg rounded-full "
            onClick={handleNextPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
