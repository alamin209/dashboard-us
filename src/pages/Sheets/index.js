import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// API
import { allSheets, deleteSheet } from "api/sheets";
import { allAdmins } from "api/admins";

// Data
import { SheetTableHead, SheetFilters } from "data/sheet";

// Helpers
import { formatOptions } from "helpers/functions";

// Actions
import {
  saveSheetsData,
  selectAllSheets,
  deselectAllSheets,
  updateSheetsFilters,
} from "store/actions";

// Components
import Header from "shared/Header";
import Pagination from "shared/Pagination";
import SheetItem from "./SheetItem";
import Loading from "shared/Loading";
import Empty from "shared/Empty";
import TableHead from "shared/Table/TableHead";
import Filters from "shared/Filters";

const Sheets = () => {
  const dispatch = useDispatch();

  // Filter States
  const [filters, setFilters] = useState({});
  const [filterFields, setFilterFields] = useState(SheetFilters);

  // Data States
  const sheetsDataFromStore = useSelector((state) => state.sheetReducer);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noData, setNoData] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Data
  const fetchData = async (options = {}, refetch = false, page) => {
    if ((!sheetsDataFromStore.items.length && !noData) || refetch) {
      setIsFetching(true);

      const fetchSheets = await allSheets({
        allDetails: true,
        limit: itemsPerPage,
        ...options,
      });
      setIsFetching(false);

      setData(fetchSheets.data);
      setTotalPages(fetchSheets.totalPages);
      dispatch(
        saveSheetsData({
          items: fetchSheets.data,
          currentPage: page ? page : currentPage,
          totalPages: fetchSheets.totalPages,
        })
      );
      if (!fetchSheets.data.length) {
        setNoData(true);
      } else {
        setNoData(false);
      }
    } else {
      setData(sheetsDataFromStore.items);
      setTotalPages(sheetsDataFromStore.totalPages);
      setCurrentPage(sheetsDataFromStore.currentPage);
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

  const addAdminsToFilterOptions = async () => {
    const adminsFilter = filterFields.find(
      (filter) => filter.accessor === "admin"
    );

    adminsFilter.isLoading = true;
    const admins = await allAdmins();
    adminsFilter.isLoading = false;

    if (!admins.success)
      return admins.errors.forEach((error) => toast.error(error));

    adminsFilter.options = formatOptions(admins.data || []);

    setFilterFields((prev) => {
      const newFilters = [...prev];
      const index = newFilters.findIndex(
        (filter) => filter.accessor === "country"
      );
      newFilters[index] = adminsFilter;
      return newFilters;
    });
  };

  const selectAll = (isChecked) => {
    isChecked ? dispatch(selectAllSheets()) : dispatch(deselectAllSheets());
  };

  useEffect(() => {
    fetchData({ page: currentPage });
    addAdminsToFilterOptions();
  }, []);

  useEffect(() => {
    if (data.length) setData(sheetsDataFromStore.items);
  }, [sheetsDataFromStore]);

  return (
    <div>
      <Header title="Sheets" />
      <div className="pb-3 mb-4">
        <Filters
          reducerName="sheetReducer"
          onFilter={applyFilters}
          onClear={clearFilters}
          deleteAPI={deleteSheet}
          fetchFunction={fetchData}
          setLimit={setItemsPerPage}
          filterFields={filterFields}
          updateFiltersAction={updateSheetsFilters}
          deselectAction={deselectAllSheets}
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
                  columns={SheetTableHead}
                  reducerName="sheetReducer"
                  onSelectAll={selectAll}
                  actionFunction={saveSheetsData}
                />
                <tbody>
                  {data.map((sheet) => (
                    <SheetItem sheet={sheet} key={sheet._id} />
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

export default Sheets;
