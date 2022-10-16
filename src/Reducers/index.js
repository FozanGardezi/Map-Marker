import markerReducer from "./AddMarkers";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    markers: markerReducer
})

export default allReducers