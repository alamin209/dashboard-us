import {
  SAVE_SHEETS_DATA,
  SELECT_SHEET,
  SELECT_All_SHEETS,
  DESELECT_SHEET,
  DESELECT_All_SHEETS,
  UPDATE_SHEETS_FILTERS,
} from "../types";

const initialState = {
  items: [],
  totalPages: 0,
  currentPage: 0,
  selectedIds: [],
  filters: {},
};

const sheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SHEETS_DATA:
      return {
        ...state,
        items: action.payload.items,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case SELECT_SHEET:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload],
      };

    case DESELECT_SHEET:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          (selectedId) => selectedId !== action.payload
        ),
      };

    case SELECT_All_SHEETS:
      return {
        ...state,
        selectedIds: state.items.map((item) => item._id),
      };

    case DESELECT_All_SHEETS:
      return {
        ...state,
        selectedIds: [],
      };

    case UPDATE_SHEETS_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default sheetReducer;
