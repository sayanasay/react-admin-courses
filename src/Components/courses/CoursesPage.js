import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { deleteCourse, loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";

const CoursesPage = () => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const [filter, setFilter] = useState("");

  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);
  const courses = useSelector((state) => {
    return state.authors.length === 0
      ? []
      : state.unduableCourses.present.map((course) => {
          return {
            ...course,
            authorName: authors.find((a) => a.id === course.authorId).name,
          };
        });
  });
  const [filteredCourses, setFilteredCourses] = useState([]);
  const loading = useSelector((state) => state.apiCallsInProgress) > 0;

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      dispatch(loadAuthors()).catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  useEffect(() => {
    setFilteredCourses(
      filter ? courses.filter((course) => course.authorId === +filter) : courses
    );
  }, [filter]);

  const handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await dispatch(deleteCourse(course));
    } catch (error) {
      toast.error("Delete failed." + error.message, { autoClose: false });
    }
    setFilter("");
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CourseList
            onDeleteClick={handleDeleteCourse}
            courses={filter ? filteredCourses : courses}
            authors={authors}
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
          />
        </>
      )}
    </>
  );
};

export default CoursesPage;
