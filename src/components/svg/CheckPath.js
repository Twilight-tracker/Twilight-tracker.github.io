import { useHexedCanvasContext } from "./HexedCanvas";

const originData = [-4, 0];
const dataPoints = [
  [1, 1, -2, 2, 3, 3],
  [Math.sqrt(2), Math.sqrt(2), 2, 0, 7, -7],
  [1, 1, -2, -2, -6, 6],
];
const mult = 0.06;

const CheckPath = ({ center, radius, fill = "whitesmoke", ...props }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }
  const origin = `${center.x + mult * radius * originData[0]},${
    center.y + mult * radius * originData[1]
  }`;
  const path = dataPoints
    .map(
      ([arx, ary, adx, ady, lx, ly]) =>
        `a ${mult * radius * arx},${mult * radius * ary} 0 0 0  ${
          mult * radius * adx
        },${mult * radius * ady} l ${mult * radius * lx},${mult * radius * ly}`
    )
    .join(" ");
  return <path fill={fill} {...props} d={`M${origin} ${path}z`} />;
};

export default CheckPath;
