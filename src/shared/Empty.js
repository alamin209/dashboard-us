import React from "react";

// Helpers
import { noDataIllustration } from "helpers/illustarions";

const Empty = () => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 m-auto mt-5 overflow-hidden">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col items-center">
          {noDataIllustration()}
          <p className="text-slate-500 dark:text-gray-200 text-xl font-medium mt-6 mb-4">
            No Data Available ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Empty;
