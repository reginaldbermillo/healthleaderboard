import React from "react";

// Define the types for the props
interface PaginationProps {
  nPages: number; // total number of pages
  currentPage: number; // the current page number
  setCurrentPage: (page: number) => void; // function to update the current page
}

const Pagination: React.FC<PaginationProps> = ({
  nPages,
  currentPage,
  setCurrentPage,
}) => {
  // Generate an array of page numbers
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  // Go to the next page
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" onClick={prevPage} href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""}`}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={nextPage} href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
