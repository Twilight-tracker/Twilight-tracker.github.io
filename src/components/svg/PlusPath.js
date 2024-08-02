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

const PlusPath = ({ fill = "whitesmoke", ...props }) => {
  const { width, height, radius } = useHexedCanvasContext();
  const center = { x: 0.5 * width, y: 0.5 * height };
  const path = dataPoints
    .map(
      ([x, y]) =>
        `${center.x + mult * radius * x},${center.y + mult * radius * y}`
    )
    .join(" ");
  return <path fill={fill} {...props} d={`M${path}z`} />;
};

export default PlusPath;
