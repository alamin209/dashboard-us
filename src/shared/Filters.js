import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

// Components
import Modal from "shared/Modal";
import ExportButton from "shared/Buttons/ExportButton";
import RefreshButton from "shared/Buttons/RefreshButton";

// Data
import { actions, itemsPerPageOptions } from "data/constants";

// Assets
import {
  filterIcon,
  closeIcon,
  checkCircleIcon,
  deleteFilledIcon,
  deleteIcon,
  plusIcon,
} from "helpers/icons";

const Filters = ({
  reducerName,
  onFilter,
  onClear,
  deleteAPI,
  exportAPI,
  fetchFunction,
  setLimit,
  filterFields,
  deselectAction,
  updateFiltersAction,
  addBtnURL,
  addBtnName,
}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector((state) => state[reducerName]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filters = reducerData.filters;

  // Modal Data
  const modalData = {
    title: "Delete Admins",
    description: "Are you sure you want to delete selected admins?",
    button: "Delete",
    icon: deleteFilledIcon("mt-4 w-12 h-12 m-auto text-primary", 40, 40),
  };

  // Filter Functions
  const applyFilters = async () => {
    onFilter(filters);
  };

  const clearFilters = async () => {
    dispatch(updateFiltersAction({}));
    onClear();
  };

  const handleAction = async () => {
    const selectedIds = reducerData.selectedIds.join(",");

    if (!reducerData.selectedIds.length && bulkAction !== "all") {
      setIsModalOpen(false);
      return toast.error("No items selected");
    }

    const response = await deleteAPI(selectedIds, {
      ...(bulkAction === "many" && { many: true }),
      ...(bulkAction === "all" && { all: true }),
    });

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    fetchFunction({ page: 1 }, true);
    dispatch(deselectAction());
    setIsModalOpen(false);
    setBulkAction(null);
    toast.success(response.message);
  };

  const handleLimitChange = (e) => {
    if (e) {
      fetchFunction({ page: 1, limit: e.value }, true);
      setLimit(e.value);
    } else {
      fetchFunction({ page: 1 }, true);
      setLimit(10);
    }
  };

  const handleSelectChange = (e, field) => {
    if (e) {
      dispatch(updateFiltersAction({ ...filters, [field.accessor]: e.value }));
    } else {
      delete filters[field.accessor];
      dispatch(updateFiltersAction({ ...filters }));
    }
  };

  const handleSelectValue = (field) => {
    console.log(filters[field.accessor]);
    return !filters[field.accessor]
      ? null
      : field.options.find((opt) => opt.value === filters[field.accessor]);
  };

  const handleInputChange = (e, field) => {
    dispatch(
      updateFiltersAction({ ...filters, [field.accessor]: e.target.value })
    );
  };

  return (
    <>
      <div className="md:flex block flex-row mb-1 gap-2 sm:mb-0 justify-between w-full">
        {addBtnURL && addBtnName && (
          <Link
            to={addBtnURL}
            className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold text-white bg-slate-500 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-primary-dimmed"
          >
            <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              Add {addBtnName}
            </span>
            {plusIcon()}
          </Link>
        )}

        <div className="md:flex md:gap-4 md:items-center mt-4 md:mt-0">
          <div className="flex gap-4 items-center justify-between mb-4 md:mb-0">
            {exportAPI && (
              <div className="flex gap-2 items-center">
                <ExportButton apiEndpoint={exportAPI} />
              </div>
            )}
            <div className="flex gap-2 items-center">
              <RefreshButton fetchFunction={fetchFunction} />
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-2 items-center">
              <Select
                options={actions}
                value={
                  bulkAction
                    ? actions.find((action) => action.value === bulkAction)
                    : null
                }
                placeholder="Bulk Actions"
                isClearable={true}
                isSearchable={false}
                onChange={(e) =>
                  e ? setBulkAction(e.value) : setBulkAction(null)
                }
              />

              <button
                className="flex items-center gap-2 min-h-[40px] px-4 py-2 text-base font-semibold text-primary bg-primary-dimmed rounded-lg shadow-md hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blue-200"
                type="button"
                onClick={() => bulkAction && setIsModalOpen(true)}
              >
                <span className="hidden 2xl:block">Apply</span>
                {checkCircleIcon()}
              </button>
            </div>
            <div className="flex gap-2 items-center">
              {setLimit && (
                <Select
                  options={itemsPerPageOptions}
                  placeholder="Items per page"
                  isSearchable={false}
                  isClearable={true}
                  onChange={handleLimitChange}
                />
              )}

              {filterFields && (
                <button
                  className="flex items-center gap-2 min-h-[40px] px-4 py-2 text-base font-semibold text-white bg-primary rounded-lg shadow-md hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blue-200"
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span className="hidden md:block">Filter</span>
                  {isFilterOpen ? closeIcon() : filterIcon()}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFilterOpen && (
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-800 m-auto mt-4">
          <div>
            <form
              className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-none gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                Object.keys(filters).length > 0 && applyFilters();
              }}
            >
              {filterFields.map((field) => (
                <div key={field.accessor}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <div className="mt-2">
                      <Select
                        options={field.options}
                        value={handleSelectValue(field)}
                        className="w-full"
                        placeholder={`Select ${field.label}`}
                        isClearable={true}
                        isSearchable={field.isSearchable}
                        isDisabled={!field.options.length}
                        isLoading={field.isLoading}
                        onChange={(e) => handleSelectChange(e, field)}
                      />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <input
                        type={field.type ? field.type : "text"}
                        className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-[6px] px-[10px] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                        placeholder={`Search by ${field.label}`}
                        value={
                          filters[field.accessor] ? filters[field.accessor] : ""
                        }
                        onChange={(e) => handleInputChange(e, field)}
                      />
                    </div>
                  )}
                </div>
              ))}

              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-none gap-3 lg:col-span-3 sm:col-span-2 col-span-none">
                <div className="sm:col-span-2 mt-2">
                  <button
                    className="flex items-center justify-center w-full gap-2 py-[6px] px-[10px] text-base font-semibold text-white text-center bg-primary rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-blue-200"
                    type="sumbit"
                  >
                    Apply Filters {checkCircleIcon()}
                  </button>
                </div>

                <div className="flex items-center sm:col-span-2 lg:col-span-1">
                  {Object.keys(filters).length > 0 && (
                    <button
                      className="flex items-center justify-center gap-2 w-full py-[6px] px-[10px] text-base font-normal text-blue-500 bg-transparent focus:outline-none focus:ring-0"
                      type="button"
                      onClick={() => clearFilters()}
                    >
                      Clear Filters {deleteIcon()}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={() => handleAction()}
        data={modalData}
      />
    </>
  );
};

export default Filters;
