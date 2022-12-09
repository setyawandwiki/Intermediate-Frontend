import { combineReducers } from "redux";

// import counter from "./counter";
import user from "./user";
import counter from "./latihan";
import booking from "./booking";
import event from "./event";
import wishList from "./wishList";

export default combineReducers({
  // counter,
  event,
  user,
  wishList,
  counter,
  booking,
});
