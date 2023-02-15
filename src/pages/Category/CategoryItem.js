import properties from "properties.json";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { deleteCategory } from "api/category";

// Actions
import {
  deselectCategory,
  saveCategoryData,
  selectCategory,
} from "store/actions";

// Assets
import { deleteFilledIcon, deleteIcon, editIcon } from "helpers/icons";

// Helpers

// Components
import Checkbox from "shared/Checkbox";
import Modal from "shared/Modal";

const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();
  const categoriesDataFromStore = useSelector((state) => state.categoryReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData = {
    title: "Delete Category",
    description: "Are you sure you want to delete this Category?",
    button: "Delete",
    icon: deleteFilledIcon("mt-4 w-12 h-12 m-auto text-primary", 40, 40),
  };

  const handleDelete = async () => {
    const response = await deleteCategory(category._id);
    setIsModalOpen(false);

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    dispatch(
      saveCategoryData({
        ...categoriesDataFromStore,
        items: categoriesDataFromStore.items.filter(
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
                    ? dispatch(selectCategory(category._id))
                    : dispatch(deselectCategory(category._id));
                }}
                checked={categoriesDataFromStore.selectedIds.includes(
                  category._id
                )}
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
            src={`${properties.API_HOST}/${category.feature_image}`}
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
