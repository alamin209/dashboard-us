import React from "react";

// Assets
import { refreshIcon } from "helpers/icons";

const RefreshButton = ({ fetchFunction }) => {
  return (
    <button
      className="flex items-center min-h-[40px] gap-2 px-4 py-2 text-base font-semibold text-primary bg-primary-dimmed rounded-lg shadow-md hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blue-200"
      type="button"
      onClick={() => fetchFunction({ page: 1 }, true)}
    >
      <span className="block md:hidden lg:hidden 2xl:block">Refresh</span>
      {refreshIcon()}
    </button>
  );
};

export default RefreshButton;
