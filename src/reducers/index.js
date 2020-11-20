import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import 'bootstrap/dist/css/bootstrap.css';

export default combineReducers({
  auth,
  message,
});
