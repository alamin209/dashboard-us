import React from "react";

const Header = ({ title }) => {
  return (
    <header className="w-full shadow-lg bg-white dark:bg-gray-700 flex justify-center items-center h-16 rounded-2xl z-40 mb-7">
      <h1 className="text-gray-500 dark:text-gray-200 uppercase font-bold m-0">
        {title}
      </h1>
    </header>
  );
};

export default Header;
