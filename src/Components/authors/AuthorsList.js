import React from "react";
import PropTypes from "prop-types";

const AuthorsList = ({ authors, courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Author</th>
        <th>Courses</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {authors.map((author) => {
        return (
          <tr key={author.id}>
            <td>{author.name}</td>
            <td>
              {courses.length == 0 ? null : (
                <ul>
                  {courses
                    .filter((course) => course.authorId == author.id)
                    .map((course) => (
                      <li key={course.id}>{course.title}</li>
                    ))}
                </ul>
              )}
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(author)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AuthorsList;
