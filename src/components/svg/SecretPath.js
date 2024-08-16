import { useHexedCanvasContext } from "./HexedCanvas";

const origin = { x: 18, y: 0 };
const dataPoints = [
  [25, -36, 0],
  [25, 36, 0],
];
const circleRadius = 6;
const strokeWidth = 2;
const mult = 0.04;

const SecretPath = ({ className, center, radius }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }
  const path = dataPoints.map(
    ([r, dx, dy]) =>
      `a ${mult * radius * r} ${mult * radius * r} 0 0 0 ${mult * radius * dx} ${
        mult * radius * dy
      }`
  ).join(" ");

  return (
    <>
      <circle
        className={className}
        cx={center.x}
        cy={center.y}
        r={mult * radius * circleRadius}
        strokeWidth={mult * radius * strokeWidth}
        fill="none"
      />
      <path
        className={className}
        fill="none"
        strokeWidth={mult * radius * strokeWidth}
        strokeLinecap="round"
        d={`M ${center.x + mult * radius * origin.x} ${
          center.y + mult * radius * origin.y
        } ${path}`}
      />
    </>
  );
};

export default SecretPath;
