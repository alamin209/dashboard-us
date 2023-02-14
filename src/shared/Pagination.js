import React from "react";

// Assets
import { angleRightIcon, angleLeftIcon } from "../helpers/icons";

// Hooks
import usePagination from "../hooks/usePagination";

const Pagination = ({ data, totalPages, currentPage, navigate }) => {
  const paginationRange = usePagination({
    totalPages,
    siblingCount: 1,
    currentPage,
  });

  return (
    <div className="px-5 bg-white py-5 flex flex-col items-center justify-between">
      <div className="flex items-center">
        <button
          type="button"
          className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
          onClick={() => {
            if (currentPage > 1) {
              navigate(currentPage - 1);
            }
          }}
        >
          {angleLeftIcon("", 9, 8)}
        </button>
        {paginationRange.map((page) => {
          if (page === "DOTS") {
            return (
              <button
                key={page}
                type="button"
                className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
              >
                ...
              </button>
            );
          }

          return (
            <button
              key={page}
              type="button"
              className={`w-full px-4 py-2 border-t border-b text-base ${
                currentPage === page
                  ? "text-white bg-slate-400 hover:bg-gray-500"
                  : "text-gray-600 bg-white hover:bg-gray-10"
              }`}
              onClick={currentPage === page ? null : () => navigate(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          type="button"
          className="w-full p-4 border-t border-b border-r border-l text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
          onClick={() => {
            if (currentPage < totalPages) {
              navigate(currentPage + 1);
            }
          }}
        >
          {angleRightIcon("", 9, 8)}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
