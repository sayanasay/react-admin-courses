import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";
import { exportAllDeclaration } from "@babel/types";

it("Should handle creating courses", function () {
  //
  const store = createStore(rootReducer, initialState);
  const course = { id: 1, title: "Clean Code" };
  const course2 = { id: 2, title: "Course2" };
  const course1 = { id: 1, title: "Updated Course" };
  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);
  const action2 = courseActions.createCourseSuccess(course2);
  store.dispatch(action2);
  const action3 = courseActions.updateCourseSuccess(course1);
  store.dispatch(action3);

  // assert
  const createdCourses = store.getState().courses;
  expect(createdCourses[0]).toEqual(course1);
  expect(createdCourses[1]).toEqual(course2);
});
