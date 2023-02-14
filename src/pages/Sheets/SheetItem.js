import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { deleteSheet } from "api/sheets";

// Actions
import { saveSheetsData, selectSheet, deselectSheet } from "store/actions";

// Assets
import { downloadIcon, deleteIcon, deleteFilledIcon } from "helpers/icons";

// Helpers
import { formatDate } from "helpers/functions";

// Components
import Modal from "shared/Modal";
import Checkbox from "shared/Checkbox";

// Properties
import properties from "properties.json";

const SheetItem = ({ sheet }) => {
  const dispatch = useDispatch();
  const sheetsDataFromStore = useSelector((state) => state.sheetReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData = {
    title: "Delete Sheet",
    description: "Are you sure you want to delete this sheet?",
    button: "Delete",
    icon: deleteFilledIcon("mt-4 w-12 h-12 m-auto text-primary", 40, 40),
  };

  const handleDelete = async () => {
    const response = await deleteSheet(sheet._id);
    setIsModalOpen(false);

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    dispatch(
      saveSheetsData({
        ...sheetsDataFromStore,
        items: sheetsDataFromStore.items.filter(
          (item) => item._id !== sheet._id
        ),
      })
    );
    toast.success(response.message);
  };

  return (
    <>
      <tr>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <Checkbox
                onCheck={(isChecked) => {
                  isChecked
                    ? dispatch(selectSheet(sheet._id))
                    : dispatch(deselectSheet(sheet._id));
                }}
                checked={sheetsDataFromStore.selectedIds.includes(sheet._id)}
              />
            </div>
          </div>
        </td>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <p className="text-gray-500 whitespace-no-wrap">{sheet.name}</p>
            </div>
          </div>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            <Link
              to={`/admins/${sheet.admin._id}/edit`}
              className="underline text-blue-500"
            >
              {sheet.admin.name}
            </Link>
          </p>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(sheet.createdAt)}
          </p>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(sheet.updatedAt)}
          </p>
        </td>
        <td className="data-row">
          <div className="flex gap-2 justify-end">
            <a
              href="/"
              className="data-row-action-btn"
              onClick={(e) => {
                e.preventDefault();
                window.open(`${properties.API_HOST}${sheet.path}`, "_blank");
                toast.success("File Downloaded Successfully");
              }}
            >
              {downloadIcon("text-[#0A6B0D]")}
            </a>
            <a
              href="/"
              className="data-row-action-btn"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              {deleteIcon("text-[#BE691B]")}
            </a>
          </div>
        </td>
      </tr>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={() => handleDelete()}
        data={modalData}
      />
    </>
  );
};

export default SheetItem;
