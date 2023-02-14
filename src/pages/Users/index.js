import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// API
import { allUsers, deleteUser, exportUsers } from "api/users";

// Data
import { UserTableHead, UserFilters } from "data/user";

// Hooks
import useGeo from "hooks/useGeo";

// Actions
import {
  saveUsersData,
  selectAllUsers,
  deselectAllUsers,
  updateUsersFilters,
} from "store/actions";

// Components
import Header from "shared/Header";
import Pagination from "shared/Pagination";
import UserItem from "./UserItem";
import Loading from "shared/Loading";
import Empty from "shared/Empty";
import TableHead from "shared/Table/TableHead";
import Filters from "shared/Filters";

const Users = () => {
  const dispatch = useDispatch();

  // Geo Hook & States
  const {
    countries,
    states,
    cities,
    setStates,
    setCities,
    fetchStates,
    fetchCities,
    formatOptions,
    isCountryLoading,
    isStateLoading,
    isCityLoading,
  } = useGeo();

  // Filters States
  const { filters } = useSelector((state) => state.userReducer);
  const [filterFields, setFilterFields] = useState(UserFilters);

  // Data States
  const usersDataFromStore = useSelector((state) => state.userReducer);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noData, setNoData] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Data
  const fetchData = async (options = {}, refetch = false, page) => {
    if ((!usersDataFromStore.items.length && !noData) || refetch) {
      setIsFetching(true);

      const fetchUsers = await allUsers({
        allDetails: true,
        limit: itemsPerPage,
        ...options,
      });
      setIsFetching(false);

      setData(fetchUsers.data);
      setTotalPages(fetchUsers.totalPages);
      dispatch(
        saveUsersData({
          items: fetchUsers.data,
          currentPage: page ? page : currentPage,
          totalPages: fetchUsers.totalPages,
        })
      );
      if (!fetchUsers.data.length) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } else {
      setData(usersDataFromStore.items);
      setTotalPages(usersDataFromStore.totalPages);
      setCurrentPage(usersDataFromStore.currentPage);
    }
  };

  // Pagination
  const navigate = async (page) => {
    setCurrentPage(page);
    await fetchData({ page, limit: itemsPerPage, ...filters }, true, page);
  };

  // Filter Functions
  const applyFilters = async (filtersData) => {
    fetchData({ ...filtersData }, true);
  };

  const clearFilters = async () => {
    fetchData({ page: 1 }, true);
  };

  const addCountriesToFilterOptions = () => {
    const countriesFilter = filterFields.find(
      (filter) => filter.accessor === "country"
    );

    countriesFilter.options = formatOptions(countries || []);
    countriesFilter.isLoading = isCountryLoading;

    setFilterFields((prev) => {
      const newFilters = [...prev];
      const index = newFilters.findIndex(
        (filter) => filter.accessor === "country"
      );
      newFilters[index] = countriesFilter;
      return newFilters;
    });
  };

  const addStatesToFilterOptions = () => {
    const statesFilter = filterFields.find(
      (filter) => filter.accessor === "state"
    );

    statesFilter.options = formatOptions(states || []);
    statesFilter.isLoading = isStateLoading;

    setFilterFields((prev) => {
      const newFilters = [...prev];
      const index = newFilters.findIndex(
        (filter) => filter.accessor === "state"
      );
      newFilters[index] = statesFilter;
      return newFilters;
    });
  };

  const addCitiesToFilterOptions = () => {
    const citiesFilter = filterFields.find(
      (filter) => filter.accessor === "city"
    );

    citiesFilter.options = formatOptions(cities || []);
    citiesFilter.isLoading = isCityLoading;

    setFilterFields((prev) => {
      const newFilters = [...prev];
      const index = newFilters.findIndex(
        (filter) => filter.accessor === "city"
      );
      newFilters[index] = citiesFilter;
      return newFilters;
    });
  };

  const selectAll = (isChecked) => {
    isChecked ? dispatch(selectAllUsers()) : dispatch(deselectAllUsers());
  };

  useEffect(() => {
    fetchData({ page: currentPage });
  }, []);

  useEffect(() => {
    addCountriesToFilterOptions();
  }, [countries, isCountryLoading]);

  useEffect(() => {
    addStatesToFilterOptions();
    addCitiesToFilterOptions();
  }, [states, cities, isStateLoading]);

  useEffect(() => {
    if (countries?.length && filters.country) {
      console.log("fetching states");
      delete filters.state;
      delete filters.city;

      setStates([]);
      setCities([]);

      fetchStates(filters.country);
    }

    if (!filters.country) {
      delete filters.state;
      delete filters.city;

      setStates([]);
      setCities([]);

      dispatch(updateUsersFilters(filters));
    }
  }, [filters.country]);

  useEffect(() => {
    if (states?.length && filters.state) {
      console.log("fetching cities");
      delete filters.city;
      setCities([]);

      fetchCities(filters.state);
    }

    if (!filters.state) {
      delete filters.city;

      setCities([]);

      dispatch(updateUsersFilters(filters));
    }
  }, [filters.state]);

  useEffect(() => {
    if (data.length) setData(usersDataFromStore.items);
  }, [usersDataFromStore]);

  return (
    <div>
      <Header title="Users" />
      <div className="pb-3 mb-4">
        <Filters
          reducerName="userReducer"
          onFilter={applyFilters}
          onClear={clearFilters}
          deleteAPI={deleteUser}
          exportAPI={exportUsers}
          fetchFunction={fetchData}
          setLimit={setItemsPerPage}
          filterFields={filterFields}
          updateFiltersAction={updateUsersFilters}
          deselectAction={deselectAllUsers}
          addBtnURL="/users/add"
          addBtnName="User"
        />

        {isFetching ? (
          <Loading />
        ) : noData ? (
          <Empty />
        ) : (
          <div className="mt-4 overflow-x-auto scrollbar">
            <div className="data-wrapper">
              <table className="min-w-full leading-normal">
                <TableHead
                  columns={UserTableHead}
                  reducerName="userReducer"
                  onSelectAll={selectAll}
                  actionFunction={saveUsersData}
                />
                <tbody>
                  {data.map((user) => (
                    <UserItem user={user} key={user._id} />
                  ))}
                </tbody>
              </table>
              {Boolean(data.length) && (
                <Pagination
                  data={data}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  navigate={navigate}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
