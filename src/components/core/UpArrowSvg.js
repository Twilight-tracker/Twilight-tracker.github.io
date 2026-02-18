const UpArrowSvg = ({ size = "24px", className }) => {
  return (
    <svg
      style={{ height: size, width: size }}
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3,17
          a 1,1 0 0 1 -2,-2
          l 10 -10
          a 1.414 1.414 0 0 1 2,0
          l 10 10
          a 1,1 0 0 1 -2,2
          l -9 -9
          z"
        fill="white"
      />
    </svg>
  );
};

export default UpArrowSvg;
