import { useHexedCanvasContext } from "./HexedCanvas";

const data = { cx: -2, cy: -2, r: 9, strokeWidth: 2, line1: 5, line2: 11 };
const mult = 0.04;

const MagnifierPath = ({ className, center, radius }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }

  return (
    <>
      <circle
        className={className}
        cx={center.x + mult * radius * data.cx}
        cy={center.y + mult * radius * data.cy}
        r={mult * radius * data.r}
        strokeWidth={mult * radius * data.strokeWidth}
        fill="none"
      />
      <path
        className={className}
        strokeWidth={mult * radius * data.strokeWidth}
        strokeLinecap="round"
        d={`M ${center.x + mult * radius * data.line1} ${
          center.y + mult * radius * data.line1
        } L ${center.x + mult * radius * data.line2} ${
          center.y + mult * radius * data.line2
        }`}
      />
    </>
  );
};

export default MagnifierPath;
