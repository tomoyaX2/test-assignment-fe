import { combineReducers } from "redux";
import userReducer from "./user/slice";
import linksReducer from "./links/slice";

const rootReducer = combineReducers({
  user: userReducer,
  links: linksReducer,
});

export default rootReducer;
