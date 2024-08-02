import { useState } from "react";
import { useHexedCanvasContext } from "./HexedCanvas";
import { useButtonContext } from "../ui/Button";

const innerMult = 0.08;
const outerMult = 0.8;
const dataAngles = [-Math.PI / 3, 0, Math.PI / 3];

const LeafPath = ({
  leafType,
  fill = "#000080",
  hoverFill = fill,
  ...props
}) => {
  const { width, height, radius } = useHexedCanvasContext();
  const center = { x: 0.5 * width, y: 0.5 * height };

  const buttonProps = useButtonContext();

  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    setHover((hover) => !hover, []);
  };
  if (!["forward", "backward"].includes(leafType)) {
    leafType = "forward";
  }
  const directionMult = leafType === "forward" ? 1 : -1;
  const innerDelta = innerMult * radius;
  const outerDelta = outerMult * radius;

  const innerPoints = dataAngles.map((angle) => [
    center.x + directionMult * (radius * Math.cos(angle) + innerDelta),
    center.y + radius * Math.sin(angle),
  ]);

  const outerPoints = dataAngles
    .map((angle) => [
      center.x + directionMult * (radius * Math.cos(angle) + outerDelta),
      center.y + radius * Math.sin(angle),
    ])
    .reverse();

  const path = [
    ...innerPoints.map(([x, y]) => `${x},${y}`),
    ...outerPoints.map(([x, y]) => `${x},${y}`),
  ].join(" ");

  return (
    <path
      {...props}
      {...buttonProps}
      onMouseOver={hoverHandler}
      onMouseOut={hoverHandler}
      fill={hover ? hoverFill : fill}
      d={`M${path}z`}
    />
  );
};

export default LeafPath;
