import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SelectInput from "../common/SelectInput";
import styled from "styled-components";

const StyledButtonArrowDown = styled.i`
  margin-left: 5px;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
`;
const StyledButtonArrowToggle = styled.i`
  margin-left: 5px;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${(props) =>
    props.arrow == "desc" ? "rotate(-135deg)" : "rotate(45deg)"};
`;
const StyledTh = styled.div`
  display: flex;
  align-items: center;
`;

const CourseListOnPage = ({
  courses,
  onDeleteClick,
  authors,
  onChange,
  value,
  onSortClick,
  sort,
  sortCol,
}) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>
              <StyledTh>
                Title
                {sortCol === "title" ? (
                  <StyledButtonArrowToggle
                    data-sort="title"
                    onClick={onSortClick}
                    arrow={sort}
                  ></StyledButtonArrowToggle>
                ) : (
                  <StyledButtonArrowDown
                    data-sort="title"
                    onClick={onSortClick}
                  ></StyledButtonArrowDown>
                )}
              </StyledTh>
            </th>
            <th>
              <SelectInput
                name="Author"
                label=""
                value={value || ""}
                defaultOption="Authors"
                options={authors.map((author) => ({
                  value: author.id,
                  text: author.name,
                }))}
                onChange={onChange}
              />
            </th>
            <th>
              <StyledTh>
                Category
                {sortCol === "category" ? (
                  <StyledButtonArrowToggle
                    data-sort="category"
                    onClick={onSortClick}
                    arrow={sort}
                  ></StyledButtonArrowToggle>
                ) : (
                  <StyledButtonArrowDown
                    data-sort="category"
                    onClick={onSortClick}
                  ></StyledButtonArrowDown>
                )}
              </StyledTh>
            </th>
            <th />
          </tr>
        </thead>
        {courses.length == 0 ? (
          <tbody>
            <tr>
              <td>Courses Not Found</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {courses.map((course) => {
              return (
                <tr key={course.id}>
                  <td>
                    <a
                      className="btn btn-light"
                      href={"https://www.coursera.org/learn/" + course.slug}
                    >
                      Watch
                    </a>
                  </td>
                  <td>
                    <Link to={"/course/" + course.slug}>{course.title}</Link>
                  </td>
                  <td>{course.authorName}</td>
                  <td>{course.category}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => onDeleteClick(course)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
};

CourseListOnPage.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSortClick: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  sortCol: PropTypes.string.isRequired,
};

export default CourseListOnPage;
