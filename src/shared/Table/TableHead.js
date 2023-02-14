import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Assets
import { sortUpIcon, sortDownIcon } from "helpers/icons";
import Checkbox from "shared/Checkbox";

// Data
import { hiddenColumnsInResponsive } from "data/constants";

const TableHead = ({ columns, reducerName, onSelectAll, actionFunction }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state[reducerName]);
  const [sortField, setSortField] = useState(null);
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const handleSorting = (sortField, sortOrder) => {
    const items = [...data.items];
    const sortedItems = items.sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    dispatch(actionFunction({ ...data, items: sortedItems }));
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => (
          <th
            scope="col"
            key={accessor}
            className={`px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium cursor-pointer relative ${
              Object.keys(hiddenColumnsInResponsive).includes(accessor)
                ? hiddenColumnsInResponsive[accessor]
                : ""
            }`}
            onClick={() => handleSortingChange(accessor)}
          >
            {accessor === "checkbox" ? (
              <Checkbox onCheck={(isChecked) => onSelectAll(isChecked)} />
            ) : (
              label
            )}
            {label && sortField === accessor ? (
              <div className="absolute right-0 top-[50%] translate-y-[-50%]">
                <span>
                  {sortUpIcon(
                    order === "asc" ? "text-gray-600" : "text-gray-300"
                  )}
                </span>
                <span className="mt-[-14px] block">
                  {sortDownIcon(
                    order === "desc" ? "text-gray-600" : "text-gray-300"
                  )}
                </span>
              </div>
            ) : (
              ""
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
