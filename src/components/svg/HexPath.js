import { useState } from "react";

const verticies = 6;
const angleMultiplier = (2 * Math.PI) / verticies;

const HexPath = ({
  sitOnSide = false,
  center,
  radius,
  fill,
  hoverFill = fill,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    setHover((hover) => !hover, []);
  };
  const sideAngle = sitOnSide ? 0 : 0.5;
  const path = [...Array(verticies).keys()]
    .map(
      (x) =>
        `${center.x + radius * Math.cos(angleMultiplier * (x + sideAngle))},
          ${center.y + radius * Math.sin(angleMultiplier * (x + sideAngle))}`
    )
    .join(" ");
  return (
    <path
      {...props}
      fill={hover ? hoverFill : fill}
      onMouseOver={hoverHandler}
      onMouseOut={hoverHandler}
      d={`M${path}z`}
    />
  );
};

export default HexPath;
