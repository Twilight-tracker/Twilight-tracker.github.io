import { useHexedCanvasContext } from "./HexedCanvas";

const verticies = 6;
const angleMultiplier = (2 * Math.PI) / verticies;

const HexPath = ({ className, sitOnSide = true, center, radius, ...props }) => {
  const context = useHexedCanvasContext();
  if (!center) {
    center = { x: 0.5 * context.width, y: 0.5 * context.height };
  }
  if (!radius) {
    radius = context.radius;
  }

  const sideAngle = sitOnSide ? 0 : 0.5;
  const path = [...Array(verticies).keys()]
    .map(
      (x) =>
        `${center.x + radius * Math.cos(angleMultiplier * (x + sideAngle))},
          ${center.y + radius * Math.sin(angleMultiplier * (x + sideAngle))}`
    )
    .join(" ");
  return <path className={className} d={`M${path}z`} {...props} />;
};

export default HexPath;
