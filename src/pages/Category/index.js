import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// API
import { deleteAdmin, exportAdmins } from "api/admins";
import { allCategory } from "api/category";

// Data
import { AdminFilters } from "data/admin";
import { CategoryTableHead } from "data/category";

// Actions
import {
  deselectAllAdmins,
  saveCategoryData,
  selectAllAdmins,
  updateAdminsFilters,
} from "store/actions";

// Components
import Empty from "shared/Empty";
import Filters from "shared/Filters";
import Header from "shared/Header";
import Loading from "shared/Loading";
import Pagination from "shared/Pagination";
import TableHead from "shared/Table/TableHead";
import CategoryItem from "./CategoryItem";

const Category = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});

  // Data States
  const categoryDataFromStore = useSelector((state) => state.categoryReducer);
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [noData, setNoData] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Data
  const fetchData = async (options = {}, refetch = false, page) => {
    if ((!categoryDataFromStore.items.length && !noData) || refetch) {
      setIsFetching(true);

      const fetchAdmins = await allCategory({
        limit: itemsPerPage,
        ...options,
      });
      setIsFetching(false);

      setData(fetchAdmins.data);
      setTotalPages(fetchAdmins.totalPages);
      dispatch(
        saveCategoryData({
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
      setData(categoryDataFromStore.items);
      setTotalPages(categoryDataFromStore.totalPages);
      setCurrentPage(categoryDataFromStore.currentPage);
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
    if (data.length) setData(categoryDataFromStore.items);
  }, [categoryDataFromStore]);

  return (
    <div>
      <Header title="Category" />
      <div className="pb-3 mb-4">
        <Filters
          reducerName="categoryReducer"
          onFilter={applyFilters}
          onClear={clearFilters}
          deleteAPI={deleteAdmin}
          exportAPI={exportAdmins}
          fetchFunction={fetchData}
          setLimit={setItemsPerPage}
          filterFields={AdminFilters}
          updateFiltersAction={updateAdminsFilters}
          deselectAction={deselectAllAdmins}
          addBtnURL="/category/add"
          addBtnName="Category"
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
                  columns={CategoryTableHead}
                  reducerName="categoryReducer"
                  onSelectAll={selectAll}
                  actionFunction={saveCategoryData}
                />
                <tbody>
                  {data.map((category) => (
                    <CategoryItem category={category} key={category._id} />
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

export default Category;
