import { combineReducers } from "redux";

import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
  counter: authReducer,
});

export default rootReducer;
