import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { deleteAdmin } from "api/admins";

// Actions
import { deselectAdmin, saveAdminsData, selectAdmin } from "store/actions";

// Assets
import { deleteFilledIcon, deleteIcon, editIcon } from "helpers/icons";

// Helpers

// Components
import Checkbox from "shared/Checkbox";
import Modal from "shared/Modal";

const CategoryItem = ({ category }) => {
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
    const response = await deleteAdmin(category._id);
    setIsModalOpen(false);

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    dispatch(
      saveAdminsData({
        ...adminsDataFromStore,
        items: adminsDataFromStore.items.filter(
          (item) => item._id !== category._id
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
                    ? dispatch(selectAdmin(category._id))
                    : dispatch(deselectAdmin(category._id));
                }}
                checked={adminsDataFromStore.selectedIds.includes(category._id)}
              />
            </div>
          </div>
        </td>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                {category.name}
              </p>
            </div>
          </div>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap"></p>
        </td>
        <td className="data-row hidden md:table-cell">
          <img
            className="object-fill h-48 w-96 rounded-md"
            src={`https://agoverse.us/backend/${category.feature_image}`}
            alt="advertiseImage"
          />
        </td>
        <td className="data-row hidden md:table-cell">
          {category.status === 1 ? (
            <p className="text-gray-900 whitespace-no-wrap">Active</p>
          ) : (
            <p className="text-gray-900 whitespace-no-wrap">Inactive</p>
          )}
        </td>
        <td className="data-row">
          <div className="flex gap-2 justify-end">
            <Link
              to={`/admins/${category._id}/edit`}
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

export default CategoryItem;
