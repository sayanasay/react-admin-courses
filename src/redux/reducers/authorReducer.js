import * as types from "../actions/actionTypes";
// import initialState from "./initialState";

const initialState = [];

export default function authorReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    case types.DELETE_AUTHOR_OPTIMISTIC:
      return state.filter((author) => author.id !== action.author.id);
    default:
      return state;
  }
}
