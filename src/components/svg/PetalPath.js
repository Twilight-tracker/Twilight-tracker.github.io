import { useState } from "react";
import { useHexedCanvasContext } from "./HexedCanvas";

const innerMult = 1;
const outerMult = 1.25;
const innerCoef = 0.03;
const outerCoef = 0.5 + (Math.sqrt(0.75) * innerCoef) / outerMult;

const textMult = 1.03;

const dataPoints = [
  { angles: [Math.PI / 6, -Math.PI / 6], coef: innerCoef, mult: innerMult },
  { angles: [-Math.PI / 6, Math.PI / 6], coef: innerCoef, mult: innerMult },
  { angles: [0, Math.PI / 3], coef: outerCoef, mult: outerMult },
  { angles: [0, 0], coef: 0, mult: outerMult },
  { angles: [0, -Math.PI / 3], coef: outerCoef, mult: outerMult },
];

const adjustFirstPlayerToTop = -2;

const PetalPath = ({
  sitOnSide = true,
  playerIndex = 0,
  fill = "whitesmoke",
  hoverFill = fill,
  textFill = "whitesmoke",
  text,
  playerTexts,
  ...props
}) => {
  const { width, height, radius } = useHexedCanvasContext();
  const center = { x: 0.5 * width, y: 0.5 * height };
  const [hover, setHover] = useState(false);
  const hoverHandler = () => {
    setHover((hover) => !hover, []);
  };
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

  const textPoint = {
    x: center.x + radius * textMult * Math.cos(alpha),
    y: 0.98 * center.y + radius * textMult * Math.sin(alpha),
  };

  return (
    <>
      <path
        {...props}
        onMouseOver={hoverHandler}
        onMouseOut={hoverHandler}
        fill={hover ? hoverFill : fill}
        d={`M${path}z`}
      />
      {(playerTexts || text) && (
        <text
          {...props}
          onMouseOver={hoverHandler}
          onMouseOut={hoverHandler}
          fill={textFill}
          fontSize="3.5em"
          alignmentBaseline="central"
          textAnchor="middle"
          {...textPoint}
        >
          {playerTexts ? playerTexts[playerIndex] : text}
        </text>
      )}
    </>
  );
};

export default PetalPath;
