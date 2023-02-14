import React from "react";

// Icons
import { spinnerIcon } from "../helpers/icons";

const Loading = () => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 m-auto mt-5 mb-5">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          {spinnerIcon()}
          <p className="text-slate-500 dark:text-gray-200 text-base font-medium mt-4">
            Loading Data ...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
