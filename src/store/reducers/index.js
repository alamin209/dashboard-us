import { combineReducers } from "redux";

// Reducers
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import adminReducer from "./adminReducer";
import questionReducer from "./questionsReducer";
import sheetReducer from "./sheetReducer";

const rootReducer = combineReducers({
  userReducer,
  dataReducer,
  adminReducer,
  questionReducer,
  sheetReducer,
});

export default rootReducer;
