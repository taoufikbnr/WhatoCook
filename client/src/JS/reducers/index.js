import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  authReducer,productReducer,userReducer,commentReducer
});

export default rootReducer;
