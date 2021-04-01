import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import companyprofileReducer from "./companyprofileReducer";
import institutionReducer from "./institutionReducer";
import mealReducer from "./mealReducer";
import roomReducer from "./roomReducer";
import filmReducer from "./filmReducer";
import seatReducer from "./seatReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  companyprofile: companyprofileReducer,
  institution: institutionReducer,
  meal: mealReducer,
  room: roomReducer,
  film: filmReducer,
  seat: seatReducer,
});
