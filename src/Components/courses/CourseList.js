import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CourseListOnPage from "./CourseListOnPage";
import Pagination from "../common/Pagination";

const CourseList = ({ courses, onDeleteClick, authors, onChange, value }) => {
  const pageLimit = 5;
  const [coursesOnPage, setCoursesOnPage] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [sort, setSort] = useState("nosort");
  const [sortCol, setSortCol] = useState("");
  const range = (from, to) => {
    const range = [];
    for (let i = from; i <= to; i++) {
      range.push(i);
    }
    return range;
  };
  const [pages, setPages] = useState([]);

  const handleClickPage = (page) => {
    page > 0 && page <= pages.length ? setCurPage(page) : null;
  };

  const handleSortClick = (event) => {
    setSortCol(event.target.dataset.sort);
    sort === "asc" ? setSort("desc") : setSort("asc");
  };

  const sortCourses = (sort, courses) => {
    if (sort === "asc") {
      return courses.sort((a, b) =>
        a[`${sortCol}`].toLowerCase() > b[`${sortCol}`].toLowerCase() ? 1 : -1
      );
    } else if (sort === "desc") {
      return courses.sort((a, b) =>
        a[`${sortCol}`].toLowerCase() < b[`${sortCol}`].toLowerCase() ? 1 : -1
      );
    } else return courses;
  };

  useEffect(() => {
    setCoursesOnPage(
      sortCourses(sort, courses).filter(
        (course, id) =>
          id >= (curPage - 1) * pageLimit && id < pageLimit * curPage
      )
    );
  }, [courses, curPage, sort]);

  useEffect(() => {
    setPages(range(1, Math.ceil(courses.length / pageLimit)));
  }, [courses]);

  useEffect(() => {
    setCurPage(1);
  }, [value]);

  return (
    <>
      <CourseListOnPage
        onDeleteClick={onDeleteClick}
        authors={authors}
        onChange={onChange}
        value={value}
        courses={coursesOnPage}
        onSortClick={handleSortClick}
        sort={sort}
        sortCol={sortCol}
      />
      <Pagination
        pages={pages}
        onClickPage={handleClickPage}
        curPage={curPage}
      />
    </>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CourseList;
