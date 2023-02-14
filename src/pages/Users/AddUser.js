import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

// API
import { addUser } from "api/users";

// Hooks
import useGeo from "hooks/useGeo";

// Data
import { UserInputs } from "data/user";

// Actions
import { saveUsersData } from "store/actions";

// Helpers
import { isValidEmail, capitalize } from "helpers/functions";

// Components
import Header from "../../shared/Header";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersDataFromStore = useSelector((state) => state.userReducer);
  const {
    countries,
    states,
    cities,
    fetchStates,
    fetchCities,
    formatOptions,
    setCities,
    setStates,
    isCountryLoading,
    isStateLoading,
    isCityLoading,
  } = useGeo();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSelectOptions = (input) => {
    if (input.accessor === "country") return formatOptions(countries);
    if (input.accessor === "state") return formatOptions(states);
    if (input.accessor === "city") return formatOptions(cities);

    return input.options;
  };

  const handleSelectValue = (input) => {
    if (!formData[input.accessor]) return null;

    if (input.accessor === "country")
      return countries.find((country) => country.value === formData.country);

    if (input.accessor === "state")
      return states.find((state) => state.value === formData.state);

    if (input.accessor === "city")
      return cities.find((city) => city.value === formData.city);

    return input.options.find(
      (option) => option.value === formData[input.accessor]
    );
  };

  const handleDisabledSelect = (input) => {
    if (input.accessor === "country" && !countries.length) return true;
    if (input.accessor === "state" && !formData.country) return true;
    if (input.accessor === "city" && !formData.state) return true;

    return false;
  };

  const handleLoadingSelect = (input) => {
    if (input.accessor === "country" && isCountryLoading) return true;
    if (input.accessor === "state" && isStateLoading) return true;
    if (input.accessor === "city" && isCityLoading) return true;

    return false;
  };

  const handleInputChange = (e, input) => {
    setFormData({ ...formData, [input.accessor]: e.target.value });
  };

  const handleSelectChange = async (e, input) => {
    if (e) {
      if (input.accessor === "country") await fetchStates(e.value);
      if (input.accessor === "state") await fetchCities(e.value);

      setFormData({
        ...formData,
        [input.accessor]: e.value,
      });
    } else {
      delete formData[input.accessor];

      if (input.accessor === "country") {
        delete formData.state;
        delete formData.city;

        setStates([]);
        setCities([]);
      }

      if (input.accessor === "state") {
        delete formData.city;
        setCities([]);
      }

      setFormData({ ...formData });
    }
  };

  const renderedInputsSections = Object.keys(UserInputs).map((section) => {
    const rednderedInputs = UserInputs[section].map((input) => (
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
    if (formData.password.trim().length === 0)
      return toast.error("Password is required");
    if (!formData.email) return toast.error("Email is required");
    if (!isValidEmail(formData.email)) return toast.error("Invalid email");

    setLoading(true);

    // Add User API
    const response = await addUser(formData);
    setLoading(false);

    if (!response.success)
      return response.errors.forEach((msg) => toast.error(msg));

    formData.country = countries.find(
      (country) => country._id === formData.country
    );
    formData.state = states.find((state) => state._id === formData.state);
    formData.city = cities.find((city) => city._id === formData.city);

    formData._id = response.data._id;
    formData.createdAt = response.data.createdAt;
    formData.updatedAt = response.data.updatedAt;

    delete formData.password;

    dispatch(
      saveUsersData({
        ...usersDataFromStore,
        items: [formData, ...usersDataFromStore.items],
      })
    );
    toast.success("User added successfully");
    navigate("/users");
  };

  return (
    <div>
      <Header title="Users" />

      <div className="pb-3">
        <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
          <Link to="/users" className="btn">
            {leftArrowIcon()} Back
          </Link>
          <h2 className="text-2xl leading-tight text-slate-600 font-medium">
            Add Users
          </h2>
        </div>

        <form
          className="my-4 mb-10 shadow-md rounded-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="p-4 bg-gray-100 border-t-2 border-primary rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-gray-600 font-medium">New User</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white rounded-lg">
            {renderedInputsSections}
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button type="submit" className="submit-btn">
                {loading ? spinnerIcon() : "Add User"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
