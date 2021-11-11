import * as types from "../actions/actionTypes";
// import initialState from "./initialState";

const initialState = 0;

function actionTypeEndInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(state = initialState, action) {
  if (action.type == types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
