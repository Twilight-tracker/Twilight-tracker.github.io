import { useHexedCanvasContext } from "./HexedCanvas";

const data = [
  [-11, -8, 22],
  [-11, 0, 22],
  [-11, 8, 22],
];
const strokeWidth = 2;
const mult = 0.04;

const BurgerPath = ({ className, center, radius }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }

  const path = data.map(
    ([x, y, h]) =>
      `M ${center.x + mult * radius * x},${center.y + mult * radius * y} h ${mult * radius * h}`
  ).join(" ");
  return (
    <path
      className={className}
      strokeWidth={mult * radius * strokeWidth}
      strokeLinecap="round"
      d={path}
    />
  );
};

export default BurgerPath;
