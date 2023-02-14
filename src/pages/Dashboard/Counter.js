import React from "react";

const Counter = ({ title, todayCount, totalCount, icon, iconBg }) => {
  return (
    <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 w-full mb-5">
      <div className="flex items-center">
        <span className={`rounded-xl relative p-3 ${iconBg}`}>{icon}</span>
        <p className="text-md text-gray-600 font-medium dark:text-white ml-2">{title}</p>
      </div>
      <div className="flex flex-col justify-start">
        <p className="text-gray-700 dark:text-gray-100 text-4xl text-left font-bold my-4">
          {todayCount}
        </p>
        <div className="flex items-center text-gray-400 text-sm">
          {totalCount} {title} As Total
        </div>
      </div>
    </div>
  );
};

export default Counter;
