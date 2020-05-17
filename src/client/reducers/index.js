import { combineReducers } from "redux";
import usersReducer from "./userReducers";
import authReducer from "./authReducer";

export default combineReducers({
  users: usersReducer,
  auth: authReducer,
});
