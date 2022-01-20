import { combineReducers } from "redux";
import imageReducer from "./ImageReducer";

const RootReducer = combineReducers({
  image: imageReducer,
});

export default RootReducer;
