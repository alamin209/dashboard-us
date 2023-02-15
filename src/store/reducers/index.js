import { combineReducers } from "redux";

// Reducers
import adminReducer from "./adminReducer";
import categoryReducer from "./categoryReducer";
import dataReducer from "./dataReducer";
import questionReducer from "./questionsReducer";
import sheetReducer from "./sheetReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userReducer,
  dataReducer,
  adminReducer,
  questionReducer,
  sheetReducer,
  categoryReducer,
});

export default rootReducer;
