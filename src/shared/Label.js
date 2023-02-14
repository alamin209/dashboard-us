import React from "react";

const Label = ({
  color = "text-green-900",
  text = "Admin",
  bgColor = "bg-green-200",
}) => {
  return (
    <span
      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${color}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 top-[2px] opacity-50 rounded-full ${bgColor}`}
      ></span>
      <span className="relative text-[12px] whitespace-nowrap">{text}</span>
    </span>
  );
};

export default Label;
