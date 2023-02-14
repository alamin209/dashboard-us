import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { deleteQuestion } from "api/questions";

// Actions
import {
  saveQuestionsData,
  selectQuestion,
  deselectQuestion,
} from "store/actions";

// Assets
import { editIcon, deleteIcon, deleteFilledIcon } from "helpers/icons";

// Helpers
import { formatDate } from "helpers/functions";

// Components
import Modal from "shared/Modal";
import Checkbox from "shared/Checkbox";
import Label from "shared/Label";

const QuestionItem = ({ question }) => {
  const dispatch = useDispatch();
  const questionsDataFromStore = useSelector((state) => state.questionReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalData = {
    title: "Delete Question",
    description: "Are you sure you want to delete this question?",
    button: "Delete",
    icon: deleteFilledIcon("mt-4 w-12 h-12 m-auto text-primary", 40, 40),
  };

  const handleDelete = async () => {
    const response = await deleteQuestion(question._id);
    setIsModalOpen(false);

    if (!response.success)
      return response.errors.forEach((error) => toast.error(error));

    dispatch(
      saveQuestionsData({
        ...questionsDataFromStore,
        items: questionsDataFromStore.items.filter(
          (item) => item._id !== question._id
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
                    ? dispatch(selectQuestion(question._id))
                    : dispatch(deselectQuestion(question._id));
                }}
                checked={questionsDataFromStore.selectedIds.includes(
                  question._id
                )}
              />
            </div>
          </div>
        </td>
        <td className="data-row">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">
                {question.question}
              </p>
            </div>
          </div>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(question.createdAt)}
          </p>
        </td>
        <td className="data-row hidden md:table-cell">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(question.updatedAt)}
          </p>
        </td>
        <td className="data-row">
          <div className="flex gap-2 justify-end">
            <Link
              to={`/questions/${question._id}/edit`}
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

export default QuestionItem;
