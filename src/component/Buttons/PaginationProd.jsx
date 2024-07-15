import React from "react";
import { Button } from "@material-tailwind/react";
const Pagination = ({
  color,
  activeColor,
  variant,
  totalPosts,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.map((page, index) => {
        return (
          <Button
            color={page == currentPage ? `${activeColor}` : `${color}`}
            ripple={true}
            variant={variant}
            key={index}
            size="lg"
            onClick={() => setCurrentPage(page)}
            className="font-bold"
            style={{
              margin: "0.3rem .3rem",
            }}
          >
            {page}
          </Button>
        );
      })}
    </>
  );
};

export default Pagination;
