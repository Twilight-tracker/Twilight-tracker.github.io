import { useHexedCanvasContext } from "./HexedCanvas";

const dataPoints = [
  [-1, -1],
  [-1, -10],
  [1, -10],
  [1, -1],
  [10, -1],
  [10, 1],
  [1, 1],
  [1, 10],
  [-1, 10],
  [-1, 1],
  [-10, 1],
  [-10, -1],
];
const mult = 0.035;

const PlusPath = ({ className, center, radius, ...props }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }
  const path = dataPoints
    .map(
      ([x, y]) =>
        `${center.x + mult * radius * x},${center.y + mult * radius * y}`
    )
    .join(" ");
  return <path className={className} d={`M${path}z`} {...props} />;
};

export default PlusPath;
