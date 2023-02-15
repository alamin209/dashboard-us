
import {
  SAVE_CATEGORY_DATA,
  SELECT_CATEGORY,
  DESELECT_CATEGORY,
  SELECT_All_CATEGORIES,
  DESELECT_All_CATEGORIES,
  UPDATE_CATEGORIES_FILTERS,
} from "../types";


const initialState = {
  items: [],
  totalPages: 0,
  currentPage: 0,
  selectedIds: [],
  filters: {},
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CATEGORY_DATA:
      return {
        ...state,
        items: action.payload.items,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case SELECT_CATEGORY:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload],
      };

    case DESELECT_CATEGORY:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          (selectedId) => selectedId !== action.payload
        ),
      };

    case SELECT_All_CATEGORIES:
      return {
        ...state,
        selectedIds: state.items.map((item) => item._id),
      };

    case DESELECT_All_CATEGORIES:
      return {
        ...state,
        selectedIds: [],
      };

    case UPDATE_CATEGORIES_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
