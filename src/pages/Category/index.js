import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// API
import { allCategory, exportCategories, deleteCategory } from "api/category";

// Data
import { CategoryTableHead, CategoryFilters } from "data/category";

// Actions
import {
  deselectAllCategories,
  saveCategoryData,
  selectAllCategories,
  updateCategoriesFilters,
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

      const fetchCategory = await allCategory({
        limit: itemsPerPage,
        ...options,
      });
      setIsFetching(false);

      setData(fetchCategory.data);
      setTotalPages(fetchCategory.totalPages);
      dispatch(
        saveCategoryData({
          items: fetchCategory.data,
          currentPage: page ? page : currentPage,
          totalPages: fetchCategory.totalPages,
        })
      );
      if (!fetchCategory.data.length) {
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
    isChecked
      ? dispatch(selectAllCategories())
      : dispatch(deselectAllCategories());
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
          deleteAPI={deleteCategory}
          exportAPI={exportCategories}
          fetchFunction={fetchData}
          setLimit={setItemsPerPage}
          filterFields={CategoryFilters}
          updateFiltersAction={updateCategoriesFilters}
          deselectAction={deselectAllCategories}
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
