import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

// API
import { updateQuestion, getQuestion } from "api/questions";

// Data
import { QuestionInputs, QuestionsDeletedFields } from "data/question";

// Actions
import { saveQuestionsData } from "store/actions";

// Helpers
import { capitalize, isValidEmail } from "helpers/functions";

// Components
import Header from "shared/Header";
import Loading from "shared/Loading";

// Assets
import { leftArrowIcon, spinnerIcon } from "helpers/icons";

const UpdateQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { questionId } = useParams();
  const questionsDataFromStore = useSelector((state) => state.questionReducer);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

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

  const getQuestionData = async () => {
    setLoadingData(true);
    const response = await getQuestion(questionId);
    setLoadingData(false);

    if (!response.success) {
      response.errors.forEach((msg) => toast.error(msg));
      return navigate("/questions");
    }

    const data = response.data;

    // Delete unwanted fields
    Object.keys(data).forEach((key) => {
      if (QuestionsDeletedFields.includes(key)) {
        delete data[key];
      }
    });

    // Set non-exist fields as empty
    Object.keys(QuestionInputs).forEach((section) => {
      QuestionInputs[section].forEach((input) => {
        if (!data[input.accessor]) {
          data[input.accessor] = "";
        }
      });
    });
    setFormData(data);
  };

  useEffect(() => {
    getQuestionData();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.question) return toast.error("Question is required");

    setLoading(true);

    // Update Question API
    const response = await updateQuestion(questionId, formData);
    setLoading(false);

    if (!response.success)
      return response.errors.forEach((msg) => toast.error(msg));

    delete formData.password;

    const newQuestionsList = questionsDataFromStore.items.map((question) => {
      if (question._id === questionId) return { ...question, ...response.data };
      return question;
    });

    dispatch(
      saveQuestionsData({
        ...questionsDataFromStore,
        items: newQuestionsList,
      })
    );
    toast.success("Question updated successfully");
    navigate("/questions");
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
              value={formData[input.accessor]}
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

  return (
    <div>
      <Header title="Questions" />

      {loadingData ? (
        <Loading />
      ) : (
        <div className="pb-3">
          <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
            <Link to="/questions" className="btn">
              {leftArrowIcon()} Back
            </Link>
            <h2 className="text-2xl leading-tight text-slate-600 font-medium">
              Update Questions
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
                  {loading ? spinnerIcon() : "Update Question"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateQuestion;
