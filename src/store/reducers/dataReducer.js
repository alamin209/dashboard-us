import {
  SAVE_DASHBOARD_DATA,
  SAVE_LOGGED_ADMIN_DATA,
  RESET_STATE,
} from "../types";

const initialState = {
  dashboard: {},
  loggedAdmin: {},
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: action.payload,
      };
    case SAVE_LOGGED_ADMIN_DATA:
      return {
        ...state,
        loggedAdmin: action.payload,
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};

export default dataReducer;
