import React, { useState, useEffect } from "react";

// Assets
import { checkIcon } from "helpers/icons";

const Checkbox = ({ onCheck, checked }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div
      className="bg-[#FAFAFA] text-white rounded-[10px] p-1 focus:outline-none focus:ring-0 border-[1px] border-[#E0E0E0] cursor-pointer w-[25px] h-[25px]"
      onClick={() => {
        setIsChecked(!isChecked);
        onCheck(!isChecked);
      }}
    >
      {isChecked && checkIcon("text-[#0A6B0D]")}
    </div>
  );
};

export default Checkbox;
