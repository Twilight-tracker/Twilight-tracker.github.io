import React from "react";

const Magnifier = ({ size = "32px", className }) => {
  return (
    <svg
      style={{ height: size, width: size }}
      className={className}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="14"
        cy="14"
        r="9"
        stroke="hsl(197, 100%, 93%)"
        strokeWidth="2"
        fill="none"
      />
      <path
        stroke="hsl(197, 100%, 93%)"
        strokeWidth="2"
        strokeLinecap="round"
        d="M 10 14 h 8 M 14 10 v 8 M 21 21 L 27 27"
      />
    </svg>
  );
};

export default Magnifier;
