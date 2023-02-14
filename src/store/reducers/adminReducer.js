import {
  SAVE_ADMINS_DATA,
  SELECT_ADMIN,
  DESELECT_ADMIN,
  SELECT_All_ADMINS,
  DESELECT_All_ADMINS,
  UPDATE_ADMINS_FILTERS,
} from "../types";

const initialState = {
  items: [],
  totalPages: 0,
  currentPage: 0,
  selectedIds: [],
  filters: {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ADMINS_DATA:
      return {
        ...state,
        items: action.payload.items,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case SELECT_ADMIN:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload],
      };

    case DESELECT_ADMIN:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          (selectedId) => selectedId !== action.payload
        ),
      };

    case SELECT_All_ADMINS:
      return {
        ...state,
        selectedIds: state.items.map((item) => item._id),
      };

    case DESELECT_All_ADMINS:
      return {
        ...state,
        selectedIds: [],
      };

      case UPDATE_ADMINS_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
