import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";
import undoable from "./undoable";

const unduableCourses = undoable(courses);

const rootReducer = combineReducers({
  unduableCourses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
