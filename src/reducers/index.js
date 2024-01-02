import { combineReducers } from "redux";
import alertReducers from "./alertReducer";

export default combineReducers({
  alerts: alertReducers,
});
