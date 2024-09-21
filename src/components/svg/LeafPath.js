import { useHexedCanvasContext } from "./HexedCanvas";
import { useButtonContext } from "../ui/Button";

const innerMult = 0.12;
const outerMult = 0.85;
const dataAngles = [-Math.PI / 3, 0, Math.PI / 3];

const LeafPath = ({ className, leafType, center, radius, ...props }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }
  const buttonProps = useButtonContext();

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

  return <path className={className} {...props} {...buttonProps} d={`M${path}z`} />;
};

export default LeafPath;
