import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadCourses,
  saveCourse,
  undoCourseChange,
  redoCourseChange,
} from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { Prompt } from "react-router";
import PageNotFound from "../PageNotFound";

export function ManageCoursePage({
  courses,
  authors,
  loading,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  undoChange,
  lastUndo,
  lastRedo,
  redoChange,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";
    if (typeof title !== "string") errors.title = "Need to be string";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course Saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function onUndo() {
    undoChange(lastUndo);
    toast.success("Changes Saved");
  }

  function onRedo() {
    redoChange(lastRedo);
    toast.success("Changes Saved");
  }

  return props.course ? (
    loading && !saving ? (
      <Spinner />
    ) : (
      <>
        <CourseForm
          course={course}
          errors={errors}
          authors={authors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h4>Undo changes</h4>
              {lastUndo ? (
                <div>
                  <p>
                    <b>Last state before change: </b>
                    {lastUndo.title} -{lastUndo.authorId} -{lastUndo.category}
                  </p>
                  <button className="btn btn-secondary" onClick={onUndo}>
                    Undo
                  </button>
                </div>
              ) : (
                <p>There is no states before changes</p>
              )}
            </div>
            <div className="col">
              <h4>Redo changes</h4>
              {lastRedo ? (
                <div>
                  <p>
                    <b>Last undone change: </b>
                    {lastRedo.title} -{lastRedo.authorId} -{lastRedo.category}
                  </p>
                  <button className="btn btn-secondary" onClick={onRedo}>
                    Redo
                  </button>
                </div>
              ) : (
                <p>There is no undone changes</p>
              )}
            </div>
          </div>
        </div>
        <Prompt
          when={
            course.id == null
              ? !saving &&
                (course.title !== newCourse.title ||
                  course.category !== newCourse.title ||
                  (course.authorId !== newCourse.authorId &&
                    !isNaN(course.authorId)))
              : courses.find((item) => item.id === course.id)?.title !==
                  course.title ||
                courses.find((item) => item.id === course.id)?.category !==
                  course.category ||
                courses.find((item) => item.id === course.id)?.authorId !==
                  course.authorId
          }
          message="You have unsaved changes, are you sure you want to leave?"
        />
      </>
    )
  ) : (
    <PageNotFound />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  undoChange: PropTypes.func.isRequired,
  undoList: PropTypes.array.isRequired,
  lastUndo: PropTypes.object,
  lastRedo: PropTypes.object,
  redoChange: PropTypes.func.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.unduableCourses.present.length > 0
      ? getCourseBySlug(state.unduableCourses.present, slug)
      : newCourse;
  const undoList = state.unduableCourses.past
    .map((arr) => {
      let n = arr.find((item) => item.id === course.id);
      return n && JSON.stringify(n) !== JSON.stringify(course) ? n : null;
    })
    .filter((el) => el !== null);
  const redoList = state.unduableCourses.future
    .map((arr) => {
      let n = arr.find((item) => item.id === course.id);
      return n && JSON.stringify(n) !== JSON.stringify(course) ? n : null;
    })
    .filter((el) => el !== null);
  const lastUndo = undoList.length > 0 ? undoList[undoList.length - 1] : null;
  const lastRedo = redoList.length > 0 ? redoList[0] : null;
  return {
    course,
    courses: state.unduableCourses.present,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0 ? true : false,
    undoList,
    lastUndo,
    lastRedo,
  };
}

const mapDispatchToProps = {
  loadCourses: loadCourses,
  loadAuthors: loadAuthors,
  saveCourse: saveCourse,
  undoChange: undoCourseChange,
  redoChange: redoCourseChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
