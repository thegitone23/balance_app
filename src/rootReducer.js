import {combineReducers} from "redux";
import NavbarReducer from "./Nav/reducer";
import HomeReducer from "./Home/reducer";

export default combineReducers({
  NavbarReducer,
  HomeReducer
});