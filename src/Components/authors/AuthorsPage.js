import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import AuthorsList from "./AuthorsList";
import { loadCourses } from "../../redux/actions/courseActions";
import { Redirect } from "react-router-dom";

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors);
  const courses = useSelector((state) => {
    return state.unduableCourses.present.length === 0
      ? []
      : state.unduableCourses.present;
  });
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
  const loading = useSelector((state) => state.apiCallsInProgress) > 0;

  const requestAuthors = () => {
    if (authors.length === 0) {
      dispatch(loadAuthors()).catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  };

  const requestCourses = () => {
    if (courses.length === 0) {
      dispatch(loadCourses()).catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
  };

  useEffect(() => {
    requestAuthors();
    requestCourses();
  }, []);

  const deleteAuthorAction = (author) => {
    dispatch(deleteAuthor(author));
  };

  const handleDeleteAuthor = async (author) => {
    if (courses.find((course) => course.authorId === author.id)) {
      toast.error("Author cannot be deleted");
    } else {
      toast.success("Author deleted");
      try {
        await deleteAuthorAction(author);
      } catch (error) {
        toast.error("Delete failed." + error.message, { autoClose: false });
      }
    }
  };

  return (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddAuthorPage(true)}
          >
            Add Author
          </button>
          <AuthorsList
            authors={authors}
            onDeleteClick={handleDeleteAuthor}
            courses={courses}
          />
        </>
      )}
    </>
  );
};

export default AuthorsPage;
