import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

// API
import { getAdmin, updateAdmin } from "api/admins";

// Data
import { AdminInputs, AdminsDeletedFields } from "data/admin";

// Actions
import { saveAdminsData } from "store/actions";

// Helpers
import { capitalize, isValidEmail } from "helpers/functions";

// Components
import Header from "shared/Header";
import Loading from "shared/Loading";

// Assets
import { leftArrowIcon, spinnerIcon } from "helpers/icons";

const UpdateAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { adminId } = useParams();
  const adminsDataFromStore = useSelector((state) => state.adminReducer);

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

  const handleInputChange = (e, input) => {
    if (input.accessor === "password" && !e.target.value.length) {
      delete formData[input.accessor];
      return setFormData({ ...formData });
    }

    setFormData({ ...formData, [input.accessor]: e.target.value });
  };

  const handleInputValue = (input) => {
    return formData[input.accessor];
  };

  const getUserData = async () => {
    setLoadingData(true);
    const response = await getAdmin(adminId);
    setLoadingData(false);

    if (!response.success) {
      response.errors.forEach((msg) => toast.error(msg));
      return navigate("/admins");
    }

    const data = response.data;

    // Delete unwanted fields
    Object.keys(data).forEach((key) => {
      if (AdminsDeletedFields.includes(key)) {
        delete data[key];
      }
    });

    // Set non-exist fields as empty
    Object.keys(AdminInputs).forEach((section) => {
      AdminInputs[section].forEach((input) => {
        if (!data[input.accessor] && input.accessor !== "password") {
          data[input.accessor] = "";
        }
      });
    });
    setFormData(data);
  };

  useEffect(() => {
    getUserData();
  }, [adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email) return toast.error("Email is required");
    if (!isValidEmail(formData.email)) return toast.error("Invalid email");

    setLoading(true);

    // Update Admin API
    const response = await updateAdmin(adminId, formData);
    setLoading(false);

    if (!response.success)
      return response.errors.forEach((msg) => toast.error(msg));

    delete formData.password;

    const newAdminsList = adminsDataFromStore.items.map((admin) => {
      if (admin._id === adminId) return { ...admin, ...response.data };
      return admin;
    });

    dispatch(
      saveAdminsData({
        ...adminsDataFromStore,
        items: newAdminsList,
      })
    );
    toast.success("Admin updated successfully");
    navigate("/admins");
  };

  const renderedInputsSections = Object.keys(AdminInputs).map((section) => {
    const rednderedInputs = AdminInputs[section].map((input) => (
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
              value={handleInputValue(input)}
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
      <Header title="Admins" />

      {loadingData ? (
        <Loading />
      ) : (
        <div className="pb-3">
          <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
            <Link to="/admins" className="btn">
              {leftArrowIcon()} Back
            </Link>
            <h2 className="text-2xl leading-tight text-slate-600 font-medium">
              Update Admins
            </h2>
          </div>

          <form
            className="my-4 mb-10 shadow-md rounded-lg"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="p-4 bg-gray-100 border-t-2 border-primary rounded-lg bg-opacity-5">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="inline-flex items-center space-x-4">
                  <h1 className="text-gray-600 font-medium">New Admin</h1>
                </div>
              </div>
            </div>
            <div className="space-y-6 bg-white rounded-lg">
              {renderedInputsSections}
              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                <button type="submit" className="submit-btn">
                  {loading ? spinnerIcon() : "Update Admin"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateAdmin;
