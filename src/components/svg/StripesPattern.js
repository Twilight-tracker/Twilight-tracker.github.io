import colors from "../../data/colors.json";

const StripesPattern = ({ colorId }) => {
  return (
    <defs>
      <pattern
        id={`stripes-${colorId}`}
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)"
      >
        <rect
          width="15"
          height="20"
          transform="translate(0,0)"
          fill={colors[colorId].color}
        ></rect>
      </pattern>
      <pattern
        id={`stripes-${colorId}-hover`}
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)"
      >
        <rect
          width="15"
          height="20"
          transform="translate(0,0)"
          fill={colors[colorId].hoverColor}
        ></rect>
      </pattern>
    </defs>
  );
};

export default StripesPattern;
