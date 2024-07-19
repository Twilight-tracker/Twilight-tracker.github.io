import HexPath from "./HexPath";

const sqrt3 = Math.sqrt(3);
const dataPoints = [
  {
    points: 10,
    shift: { x: -0.5 * sqrt3, y: 0.5 },
  },
  {
    points: 12,
    shift: { x: 0, y: 1 },
  },
  {
    points: 14,
    shift: { x: 0.5 * sqrt3, y: 0.5 },
  },
];

const coef = 0.65;

const PointHexes = ({
  sitOnSide = true,
  center,
  radius,
  ...props
}) => {
  return (
    <>
      {dataPoints.map(({ points, shift }) => {
        const x = center.x + radius * coef * shift.x;
        const y = center.y + radius * coef * shift.y;
        return (
          <>
            <HexPath
              {...props}
              id={points}
              key={points}
              center={{ x: x, y: y }}
              radius={0.3 * radius}
              fill="red"
            />
          </>
        );
      })}
    </>
  );
};

export default PointHexes;
