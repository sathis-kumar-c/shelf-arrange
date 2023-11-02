import { combineReducers, createStore } from "redux";
import loginReducer from "./reducers/login-reducer";

const rootReducer = combineReducers({
  auth: loginReducer,
});

const store = createStore(rootReducer);

export default store;
