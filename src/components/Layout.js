import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Sidebar from "components/Sidebar";

const Layout = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 overflow-hidden relative p-4">
      <div className="flex items-start justify-end">
        <Sidebar />
        <div className="flex flex-col w-full lg:w-[calc(100%-18rem)] h-full overflow-auto pl-0 md:px-4 md:space-y-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
