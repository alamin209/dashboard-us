import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

// API
import { getUser, updateUser } from "api/users";

// Hooks
import useGeo from "hooks/useGeo";

// Data
import { UserInputs, UsersDeletedFields } from "data/user";

// Actions
import { saveUsersData } from "store/actions";

// Helpers
import { capitalize, isValidEmail } from "helpers/functions";

// Components
import Loading from "shared/Loading";
import Header from "../../shared/Header";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { userId } = useParams();
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
  const [loadingData, setLoadingData] = useState(false);

  const handleSelectOptions = (input) => {
    if (input.accessor === "country") return formatOptions(countries || []);
    if (input.accessor === "state") return formatOptions(states || []);
    if (input.accessor === "city") return formatOptions(cities || []);

    return input.options;
  };

  const handleSelectValue = (input) => {
    if (!formData[input.accessor]) return null;

    if (input.accessor === "country" && countries.length)
      return formatOptions(countries).find(
        (country) => country.value === formData.country
      );

    if (input.accessor === "state" && states.length)
      return formatOptions(states).find(
        (state) => state.value === formData.state
      );

    if (input.accessor === "city" && cities.length)
      return formatOptions(cities).find((city) => city.value === formData.city);

    return input.options.find(
      (option) => option.value === formData[input.accessor]
    );
  };

  const handleDisabledSelect = (input) => {
    if (input.accessor === "country" && !countries.length) return true;
    if (input.accessor === "state" && !states.length) return true;
    if (input.accessor === "city" && !cities.length) return true;

    return false;
  };

  const handleLoadingSelect = (input) => {
    if (input.accessor === "country" && isCountryLoading) return true;
    if (input.accessor === "state" && isStateLoading) return true;
    if (input.accessor === "city" && isCityLoading) return true;

    return false;
  };

  const handleSelectChange = async (e, input) => {
    if (e) {
      if (input.accessor === "country") {
        setStates([]);
        setCities([]);

        fetchStates(e.value);
      }

      if (input.accessor === "state") {
        setCities([]);

        fetchCities(e.value);
      }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email) return toast.error("Email is required");
    if (!isValidEmail(formData.email)) return toast.error("Invalid email");

    setLoading(true);

    // Update User API
    const response = await updateUser(userId, formData);
    setLoading(false);

    if (!response.success)
      return response.errors.forEach((msg) => toast.error(msg));

    const data = { ...response.data };

    data.country = countries.find((country) => {
      country.name = country.label;
      return country.value === formData.country;
    });
    data.state = states.find((state) => {
      state.name = state.label;
      return state.value === formData.state;
    });
    data.city = cities.find((city) => {
      city.name = city.label;
      return city.value === formData.city;
    });

    console.log(data);

    const newUsersList = usersDataFromStore.items.map((user) => {
      if (user._id === userId) return { ...user, ...data };
      return user;
    });

    dispatch(
      saveUsersData({
        ...usersDataFromStore,
        items: newUsersList,
      })
    );
    toast.success("User updated successfully");
    navigate("/users");
  };

  const getUserData = async () => {
    setLoadingData(true);
    const response = await getUser(userId);
    setLoadingData(false);

    if (!response.success) {
      response.errors.forEach((msg) => toast.error(msg));
      return navigate("/users");
    }

    const data = response.data;

    // Delete unwanted fields
    Object.keys(data).forEach((key) => {
      if (UsersDeletedFields.includes(key)) {
        delete data[key];
      }
    });

    // Set non-exist fields as empty
    Object.keys(UserInputs).forEach((section) => {
      UserInputs[section].forEach((input) => {
        if (!data[input.accessor] && input.accessor !== "password") {
          data[input.accessor] = "";
        }
      });
    });

    setFormData(data);
  };

  useEffect(() => {
    if (!Object.keys(formData).length) return;
    fetchStates(formData.country);
    fetchCities(formData.state);
  }, [loadingData]);

  useEffect(() => {
    getUserData();
  }, [userId]);

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
      <Header title="Users" />

      {loadingData ? (
        <Loading />
      ) : (
        <div className="pb-3">
          <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
            <Link to="/users" className="btn">
              {leftArrowIcon()} Back
            </Link>
            <h2 className="text-2xl leading-tight text-slate-600 font-medium">
              Update Users
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
                  {loading ? spinnerIcon() : "Update User"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
