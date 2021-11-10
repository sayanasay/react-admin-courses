import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#f15b2a" };
  const coursesNumber = useSelector(
    (state) => state.unduableCourses.present
  ).length;

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle} exact>
        Courses ({coursesNumber})
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle} exact>
        Authors
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle} exact>
        About
      </NavLink>
      {" | "}
    </nav>
  );
};

export default Header;
