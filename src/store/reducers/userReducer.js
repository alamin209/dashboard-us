import {
  SAVE_USERS_DATA,
  SELECT_USER,
  DESELECT_USER,
  SELECT_All_USERS,
  DESELECT_All_USERS,
  UPDATE_USERS_FILTERS,
} from "../types";

const initialState = {
  items: [],
  totalPages: 0,
  currentPage: 0,
  selectedIds: [],
  filters: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USERS_DATA:
      return {
        ...state,
        items: action.payload.items,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case SELECT_USER:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload],
      };

    case DESELECT_USER:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          (selectedId) => selectedId !== action.payload
        ),
      };

    case SELECT_All_USERS:
      return {
        ...state,
        selectedIds: state.items.map((item) => item._id),
      };

    case DESELECT_All_USERS:
      return {
        ...state,
        selectedIds: [],
      };

    case UPDATE_USERS_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
