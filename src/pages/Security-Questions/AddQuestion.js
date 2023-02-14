import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

// API
import { addQuestion } from "api/questions";

// Data
import { QuestionInputs } from "data/question";

// Actions
import { saveQuestionsData } from "store/actions";

// Helpers
import { capitalize, isValidEmail } from "helpers/functions";

// Components
import Header from "../../shared/Header";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const AddQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionsDataFromStore = useSelector((state) => state.questionReducer);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSelectOptions = (input) => {
    return input.options;
  };

  const handleSelectValue = (input) => {
    if (!formData[input.accessor]) return null;

    return input.options.find(
      (option) => option.value === formData[input.accessor]
    );
  };

  const handleDisabledSelect = (input) => {
    return false;
  };

  const handleLoadingSelect = (input) => {
    return false;
  };

  const handleInputChange = (e, input) => {
    setFormData({ ...formData, [input.accessor]: e.target.value });
  };

  const handleSelectChange = async (e, input) => {
    if (e) {
      setFormData({
        ...formData,
        [input.accessor]: e.value,
      });
    } else {
      delete formData[input.accessor];

      setFormData({ ...formData });
    }
  };

  const renderedInputsSections = Object.keys(QuestionInputs).map((section) => {
    const rednderedInputs = QuestionInputs[section].map((input) => (
      <div key={input.accessor}>
        <div className="relative">
          {input.type === "select" ? (
            <Select
              name="role"
              value={handleSelectValue(input)}
              options={handleSelectOptions(input)}
              placeholder={`Select ${input.label}`}
              isClearable={true}
              onChange={(e) => handleSelectChange(e, input)}
              isSearchable={input.isSearchable}
              isDisabled={handleDisabledSelect(input)}
              isLoading={handleLoadingSelect(input)}
            />
          ) : (
            <input
              type={input.type}
              className="normal-input"
              placeholder={input.label}
              onChange={(e) => handleInputChange(e, input)}
            />
          )}
        </div>
      </div>
    ));

    return (
      <div key={section}>
        <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3 font-medium">
            {capitalize(section)}
          </h2>
          <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
            {rednderedInputs}
          </div>
        </div>
        <hr className="m-0" />
      </div>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.question) return toast.error("Question is required");

    setLoading(true);

    // Add Question API
    const response = await addQuestion(formData);
    setLoading(false);

    if (!response.success)
      return response.errors.forEach((msg) => toast.error(msg));

    formData._id = response.data._id;
    formData.createdAt = response.data.createdAt;
    formData.updatedAt = response.data.updatedAt;

    delete formData.password;

    dispatch(
      saveQuestionsData({
        ...questionsDataFromStore,
        items: [formData, ...questionsDataFromStore.items],
      })
    );
    toast.success("Question added successfully");
    navigate("/questions");
  };

  return (
    <div>
      <Header title="Questions" />

      <div className="pb-3">
        <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
          <Link to="/questions" className="btn">
            {leftArrowIcon()} Back
          </Link>
          <h2 className="text-2xl leading-tight text-slate-600 font-medium">
            Add Questions
          </h2>
        </div>

        <form
          className="my-4 mb-10 shadow-md rounded-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="p-4 bg-gray-100 border-t-2 border-primary rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-gray-600 font-medium">New Question</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white rounded-lg">
            {renderedInputsSections}
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button type="submit" className="submit-btn">
                {loading ? spinnerIcon() : "Add Question"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
