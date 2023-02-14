import {
  SAVE_QUESTIONS_DATA,
  SELECT_QUESTION,
  DESELECT_QUESTION,
  SELECT_All_QUESTIONS,
  DESELECT_All_QUESTIONS,
} from "../types";

const initialState = {
  items: [],
  selectedIds: [],
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_QUESTIONS_DATA:
      return {
        ...state,
        items: action.payload.items,
      };

    case SELECT_QUESTION:
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload],
      };

    case DESELECT_QUESTION:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(
          (selectedId) => selectedId !== action.payload
        ),
      };

    case SELECT_All_QUESTIONS:
      return {
        ...state,
        selectedIds: state.items.map((item) => item._id),
      };

    case DESELECT_All_QUESTIONS:
      return {
        ...state,
        selectedIds: [],
      };
    default:
      return state;
  }
};

export default questionReducer;
