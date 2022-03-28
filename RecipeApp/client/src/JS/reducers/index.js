import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  authReducer,productReducer,userReducer
});

export default rootReducer;
