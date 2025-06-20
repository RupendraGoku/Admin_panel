import React from "react";

const DataTableFooter = ({
  startIdx,
  endIdx,
  totalItems,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="datatable-footer">
      <span>
        Showing {startIdx + 1} to {Math.min(endIdx, totalItems)} of {totalItems} entries
      </span>
      <div className="pagination-buttons">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            disabled={currentPage === page}
            className={currentPage === page ? "active" : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTableFooter;
