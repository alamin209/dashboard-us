import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// API
import { allAdmins, deleteAdmin, exportAdmins } from "api/admins";

// Data
import { AdminTableHead, AdminFilters } from "data/admin";

// Actions
import {
  saveAdminsData,
  selectAllAdmins,
  deselectAllAdmins,
  updateAdminsFilters,
} from "store/actions";

// Components
import Header from "shared/Header";
import Pagination from "shared/Pagination";
import AdminItem from "./AdminItem";
import Loading from "shared/Loading";
import Empty from "shared/Empty";
import TableHead from "shared/Table/TableHead";
import Filters from "shared/Filters";

const Admins = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  // Data States
  const adminsDataFromStore = useSelector((state) => state.adminReducer);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noData, setNoData] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Data
  const fetchData = async (options = {}, refetch = false, page) => {
    if ((!adminsDataFromStore.items.length && !noData) || refetch) {
      setIsFetching(true);

      const fetchAdmins = await allAdmins({ limit: itemsPerPage, ...options });
      setIsFetching(false);

      setData(fetchAdmins.data);
      setTotalPages(fetchAdmins.totalPages);
      dispatch(
        saveAdminsData({
          items: fetchAdmins.data,
          currentPage: page ? page : currentPage,
          totalPages: fetchAdmins.totalPages,
        })
      );
      if (!fetchAdmins.data.length) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } else {
      setData(adminsDataFromStore.items);
      setTotalPages(adminsDataFromStore.totalPages);
      setCurrentPage(adminsDataFromStore.currentPage);
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
    setFilters(filtersData);
  };

  const clearFilters = async () => {
    fetchData({ page: 1 }, true);
  };

  const selectAll = (isChecked) => {
    isChecked ? dispatch(selectAllAdmins()) : dispatch(deselectAllAdmins());
  };

  useEffect(() => {
    fetchData({ page: currentPage });
  }, []);

  useEffect(() => {
    if (data.length) setData(adminsDataFromStore.items);
  }, [adminsDataFromStore]);

  return (
    <div>
      <Header title="Admins" />
      <div className="pb-3 mb-4">
        <Filters
          reducerName="adminReducer"
          onFilter={applyFilters}
          onClear={clearFilters}
          deleteAPI={deleteAdmin}
          exportAPI={exportAdmins}
          fetchFunction={fetchData}
          setLimit={setItemsPerPage}
          filterFields={AdminFilters}
          updateFiltersAction={updateAdminsFilters}
          deselectAction={deselectAllAdmins}
          addBtnURL="/admins/add"
          addBtnName="Admin"
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
                  columns={AdminTableHead}
                  reducerName="adminReducer"
                  onSelectAll={selectAll}
                  actionFunction={saveAdminsData}
                />
                <tbody>
                  {data.map((admin) => (
                    <AdminItem admin={admin} key={admin._id} />
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

export default Admins;
