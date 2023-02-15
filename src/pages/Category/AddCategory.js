import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

// API
import { addCategory } from "api/category";

// Data
import { CategoryInputs } from "data/category";

// Actions
import { saveAdminsData } from "store/actions";

// Helpers
import { capitalize } from "helpers/functions";

// Components
import Header from "../../shared/Header";

// Hooks
import useGeo from "hooks/useGeo";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchCategory, isCategoryLoading, formatOptions, category } =
    useGeo();

  const categoryDataFromStore = useSelector((state) => state.categoryReducer);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSelectOptions = (input) => {
    if (input.accessor === "parentId") return formatOptions(category);

    return input.options;
  };

  const handleSelectValue = (input) => {
    if (!formData[input.accessor]) return null;

    if (input.accessor === "parentId")
      return category.find(
        (singleCategory) => singleCategory._id === formData.singleCategory
      );

    return input.options.find(
      (option) => option.value === formData[input.accessor]
    );
  };

  const handleDisabledSelect = (input) => {
    return false;
  };

  const handleLoadingSelect = (input) => {
    if (input.accessor === "parentId" && isCategoryLoading) return true;

    return false;
  };

  const handleInputChange = (e, input) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [input.accessor]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [input.accessor]: e.target.value });
    }
  };

  const handleSelectChange = async (e, input) => {
    if (e) {
      if (input.accessor === "parentId") await fetchCategory();

      setFormData({
        ...formData,
        [input.accessor]: e.value,
      });
    }
  };

  const renderedInputsSections = Object.keys(CategoryInputs).map((section) => {
    const renderedInputs = CategoryInputs[section].map((input) => (
      <div key={input.accessor}>
        <div className="relative">
          {input.type === "select" ? (
            <>
              {formData.type !== "Subcategory" &&
              input.accessor === "parentId" ? (
                <></>
              ) : (
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
              )}
            </>
          ) : (
            <>
              {input.type === "textArea" ? (
                <textarea
                  className="normal-input"
                  placeholder="Description"
                  onChange={(e) => handleInputChange(e, input)}
                  rows="5"
                  cols="33"
                />
              ) : (
                <input
                  type={input.type}
                  className="normal-input"
                  placeholder={input.label}
                  onChange={(e) => handleInputChange(e, input)}
                />
              )}
            </>
          )}
        </div>
      </div>
    ));

    return (
      <div key={section}>
        <div className="items-center w-full p-2 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <h2 className="max-w-sm mx-auto md:w-1/3 font-medium">
            {section === "ParentId" && formData.type !== "Subcategory"
              ? ""
              : capitalize(section)}
          </h2>
          <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
            {renderedInputs}
          </div>
        </div>
      </div>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    // if (formData.password.trim().length === 0)
    //   return toast.error("Password is required");
    // if (!formData.email) return toast.error("Email is required");
    // if (!isValidEmail(formData.email)) return toast.error("Invalid email");

    //create from file upload formData object
    let data = new FormData();
    if (formData.type === "Subcategory") {
      setFormData({ ...formData, parentId: formData.parentId });
      data.append("parentId", formData.parentId);
    }
    data.append("name", formData.name);
    data.append("details", formData.details);
    data.append("feature_image", formData.feature_image);
    data.append("icon", formData.icon);
    data.append("slug", formData.slug);

    setLoading(true);
    console.log("a", data);
    // Add Admin API
    const response = await addCategory(data);
    setLoading(false);

    if (!response.success)
      return response.errors.forEach((msg) => toast.error(msg));

    dispatch(
      saveAdminsData({
        ...categoryDataFromStore,
        items: [formData, ...categoryDataFromStore.items],
      })
    );
    toast.success("Category added successfully");
    navigate("/category");
  };

  return (
    <div>
      <Header title="Category" />

      <div className="pb-3">
        <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
          <Link to="/category" className="btn">
            {leftArrowIcon()} Back
          </Link>
          <h2 className="text-2xl leading-tight text-slate-600 font-medium">
            Add Category
          </h2>
        </div>

        <form
          className="my-4 mb-10 shadow-md rounded-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="p-4 bg-gray-100 border-t-2 border-primary rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-gray-600 font-medium">New Category</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white rounded-lg">
            {renderedInputsSections}
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button type="submit" className="submit-btn">
                {loading ? spinnerIcon() : "Add Category"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
