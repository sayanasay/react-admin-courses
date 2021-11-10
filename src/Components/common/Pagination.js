import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ pages, onClickPage, curPage }) => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Previous"
              onClick={() => onClickPage(curPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages.length > 0
            ? pages.map((page, i) => {
                return (
                  <li className="page-item" key={i}>
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => onClickPage(page)}
                    >
                      {page}
                    </a>
                  </li>
                );
              })
            : null}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              aria-label="Next"
              onClick={() => onClickPage(curPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

Pagination.propTypes = {
  pages: PropTypes.array.isRequired,
  onClickPage: PropTypes.func.isRequired,
  curPage: PropTypes.number.isRequired,
};

export default Pagination;
