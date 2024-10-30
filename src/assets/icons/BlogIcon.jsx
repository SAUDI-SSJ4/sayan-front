import React from "react";

const BlogIcon = ({ active }) => {
  return (
    <>
      {active ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 28 29"
          fill="none"
        >
          {/* Active State Blog Icon */}
          <rect width="20" height="14" x="4" y="7" fill="white" />
          <rect width="16" height="2" x="6" y="9" fill="#7e8799" />
          <rect width="12" height="2" x="6" y="13" fill="#7e8799" />
          <rect width="16" height="2" x="6" y="17" fill="#7e8799" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 28 29"
          fill="none"
        >
          {/* Inactive State Blog Icon */}
          <rect width="20" height="14" x="4" y="7" fill="#7E8799" />
          <rect width="16" height="2" x="6" y="9" fill="white" />
          <rect width="12" height="2" x="6" y="13" fill="white" />
          <rect width="16" height="2" x="6" y="17" fill="white" />
        </svg>
      )}
    </>
  );
};

export default BlogIcon;
