import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { deleteUser } from "api/users";

// Actions
import { saveUsersData, selectUser, deselectUser } from "store/actions";

// Assets
import { editIcon, deleteIcon, deleteFilledIcon } from "helpers/icons";

// Components
import Modal from "shared/Modal";
import Checkbox from "shared/Checkbox";
import Label from "shared/Label";

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const usersDataFromStore = useSelector((state) => state.userReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData = {
    title: "Delete User",
    description: "Are you sure you want to delete this user?",
    button: "Delete",
    icon: deleteFilledIcon("mt-4 w-12 h-12 m-auto text-primary", 40, 40),
  };

  const handleDelete = async () => {
    const response = await deleteUser(user._id);
    setIsModalOpen(false);

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    dispatch(
      saveUsersData({
        ...usersDataFromStore,
        items: usersDataFromStore.items.filter((item) => item._id !== user._id),
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
                    ? dispatch(selectUser(user._id))
                    : dispatch(deselectUser(user._id));
                }}
                checked={usersDataFromStore.selectedIds.includes(user._id)}
              />
            </div>
          </div>
        </td>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                {user.firstName}
              </p>
            </div>
          </div>
        </td>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                {user.lastName}
              </p>
            </div>
          </div>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
        </td>
        <td className="data-row hidden xs:table-cell">
          {user.type === "PUBLIC" ? (
            <Label text="PUBLIC" />
          ) : user.type === "DISTRIBUTOR" ? (
            <Label
              text="DISTRIBUTOR"
              color="text-blue-900"
              bgColor="bg-blue-300"
            />
          ) : (
            <Label text="SPONSOR" color="text-red-900" bgColor="bg-red-300" />
          )}
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {user.country.name}
          </p>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">{user.state.name}</p>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">{user.city.name}</p>
        </td>
        <td className="data-row">
          <div className="flex gap-2 justify-end">
            <Link
              to={`/users/${user._id}/edit`}
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

export default UserItem;
