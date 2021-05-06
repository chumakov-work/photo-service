import {combineReducers} from "redux";

// Reducers
import authReducer from "./reducers/authReducer";

export const rootReducer = combineReducers({
  user: authReducer
})