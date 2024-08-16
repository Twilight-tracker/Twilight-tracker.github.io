import { useHexedCanvasContext } from "./HexedCanvas";

const innerMult = 1;
const outerMult = 1.2;
const innerCoef = 0.02;
const outerCoef = 0.5 + (Math.sqrt(0.75) * innerCoef) / outerMult;

const dataPoints = [
  { angles: [Math.PI / 6, -Math.PI / 6], coef: innerCoef, mult: innerMult },
  { angles: [-Math.PI / 6, Math.PI / 6], coef: innerCoef, mult: innerMult },
  { angles: [0, Math.PI / 3], coef: outerCoef, mult: outerMult },
  { angles: [0, 0], coef: 0, mult: outerMult },
  { angles: [0, -Math.PI / 3], coef: outerCoef, mult: outerMult },
];

const adjustFirstPlayerToTop = -2;

const PetalPath = ({ className, sitOnSide = true, playerIndex, ...props }) => {
  const { width, height, radius } = useHexedCanvasContext();
  const center = { x: 0.5 * width, y: 0.5 * height };
  const sideAngle = sitOnSide ? 0.5 : 0;
  const alpha =
    ((playerIndex + adjustFirstPlayerToTop + sideAngle) * Math.PI) / 3;

  const rotatedPoints = dataPoints.map(({ angles, coef, mult }) => [
    mult *
      (coef * Math.cos(alpha + angles[0]) +
        (1 - coef) * Math.cos(alpha + angles[1])),
    mult *
      (coef * Math.sin(alpha + angles[0]) +
        (1 - coef) * Math.sin(alpha + angles[1])),
  ]);
  const path = rotatedPoints
    .map(([x, y]) => `${center.x + radius * x},${center.y + radius * y}`)
    .join(" ");

  return (
    <>
      <path className={className} d={`M${path}z`} {...props} />
    </>
  );
};

export default PetalPath;
