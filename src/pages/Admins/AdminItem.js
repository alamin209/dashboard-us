import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { deleteAdmin } from "api/admins";

// Actions
import { saveAdminsData, selectAdmin, deselectAdmin } from "store/actions";

// Assets
import { editIcon, deleteIcon, deleteFilledIcon } from "helpers/icons";

// Helpers
import { formatDate } from "helpers/functions";

// Components
import Modal from "shared/Modal";
import Checkbox from "shared/Checkbox";
import Label from "shared/Label";

const AdminItem = ({ admin }) => {
  const dispatch = useDispatch();
  const adminsDataFromStore = useSelector((state) => state.adminReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData = {
    title: "Delete Admin",
    description: "Are you sure you want to delete this admin?",
    button: "Delete",
    icon: deleteFilledIcon("mt-4 w-12 h-12 m-auto text-primary", 40, 40),
  };

  const handleDelete = async () => {
    const response = await deleteAdmin(admin._id);
    setIsModalOpen(false);

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    dispatch(
      saveAdminsData({
        ...adminsDataFromStore,
        items: adminsDataFromStore.items.filter(
          (item) => item._id !== admin._id
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
                    ? dispatch(selectAdmin(admin._id))
                    : dispatch(deselectAdmin(admin._id));
                }}
                checked={adminsDataFromStore.selectedIds.includes(admin._id)}
              />
            </div>
          </div>
        </td>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">{admin.name}</p>
            </div>
          </div>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">{admin.email}</p>
        </td>
        <td className="data-row hidden xs:table-cell">
          {admin.role === "admin" ? (
            <Label text="Admin" />
          ) : (
            <Label
              text="Super Admin"
              color="text-blue-900"
              bgColor="bg-blue-300"
            />
          )}
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(admin.createdAt)}
          </p>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(admin.updatedAt)}
          </p>
        </td>
        <td className="data-row">
          <div className="flex gap-2 justify-end">
            <Link
              to={`/admins/${admin._id}/edit`}
              className="data-row-action-btn"
            >
              {editIcon("text-[#0A6B0D]")}
            </Link>
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

export default AdminItem;
