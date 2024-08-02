import { useState } from "react";
import { useHexedCanvasContext } from "./HexedCanvas";

const TabletPath = ({
  fill = "whitesmoke",
  hoverFill = fill,
  textFill = "whitesmoke",
  text,
  ...props
}) => {
  const { width, height, radius } = useHexedCanvasContext();
  const center = { x: 0.5 * width, y: 0.5 * height };
  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    setHover((hover) => !hover, []);
  };
  const path = rotatedPoints
    .map(([x, y]) => `${center.x + radius * x},${center.y + radius * y}`)
    .join(" ");

  const textPoint = {
    x: center.x + radius * textMult * Math.cos(alpha),
    y: 0.98 * center.y + radius * textMult * Math.sin(alpha),
  };

  return (
    <g>
      <path
        {...props}
        onMouseOver={hoverHandler}
        onMouseOut={hoverHandler}
        fill={hover ? hoverFill : fill}
        d={`M${path}z`}
      />
      {text && (
        <text
          {...props}
          onMouseOver={hoverHandler}
          onMouseOut={hoverHandler}
          fill={textFill}
          fontSize="3.5em"
          alignmentBaseline="central"
          textAnchor="middle"
          {...textPoint}
        >
          {text}
        </text>
      )}
    </g>
  );
};

export default TabletPath;
