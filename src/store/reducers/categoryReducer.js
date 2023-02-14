import { SAVE_CATEGORY_DATA } from "../types";

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

    default:
      return state;
  }
};

export default categoryReducer;
