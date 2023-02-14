import React, { useState } from "react";
import { toast } from "react-toastify";

// Properties
import properties from "properties.json";

// Assets
import { excelFileIcon, spinnerIcon } from "helpers/icons";

const ExportButton = ({ apiEndpoint }) => {
  const [loadingExport, setLoadingExport] = useState(false);

  const exportExcel = async () => {
    setLoadingExport(true);
    const response = await apiEndpoint();
    setLoadingExport(false);
    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    toast.success(response.data.message);
    window.open(`${properties.API_HOST}${response.data.path}`, "_blank");
  };

  return (
    <button
      className="flex items-center gap-2 min-h-[40px] px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blue-200"
      type="button"
      onClick={() => exportExcel()}
    >
      <span className="block md:hidden lg:hidden 2xl:block">
        Export To Excel
      </span>
      {loadingExport ? spinnerIcon("fill-primary", 19, 19) : excelFileIcon()}
    </button>
  );
};

export default ExportButton;
