import { useState } from "react";

const innerMult = 1;
const outerMult = 1.4;
const innerCoef = 0.04;
const outerCoef = 0.5 + (Math.sqrt(0.75) * innerCoef) / outerMult;

const textMult = 1.11;

const dataPoints = [
  { angles: [Math.PI / 6, -Math.PI / 6], coef: innerCoef, mult: innerMult },
  { angles: [-Math.PI / 6, Math.PI / 6], coef: innerCoef, mult: innerMult },
  { angles: [0, Math.PI / 3], coef: outerCoef, mult: outerMult },
  { angles: [0, 0], coef: 0, mult: outerMult },
  { angles: [0, -Math.PI / 3], coef: outerCoef, mult: outerMult },
];

const adjustFirstPlayerToTop = -2;

const colorScheme = [
  { offset: "0%", white: 0 },
  { offset: "100%", white: 100 },
];
// const colorScheme = [
//   { offset: "0%", white: 70 },
//   { offset: "2%", white: 80 },
//   { offset: "70%", white: 100 },
//   { offset: "99%", white: 90 },
//   { offset: "100%", white: 70 },
// ];

const PetalPath = ({
  sitOnSide = true,
  center,
  radius,
  playerIndex = 0,
  fill = "whitesmoke",
  hoverFill = fill,
  textFill = "whitesmoke",
  text,
  playerTexts,
  ...props
}) => {
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
    <g>
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
          fontSize="4.5em"
          alignmentBaseline="central"
          textAnchor="middle"
          {...textPoint}
        >
          {playerTexts ? playerTexts[playerIndex] : text}
        </text>
      )}
    </g>
  );
};

export default PetalPath;
