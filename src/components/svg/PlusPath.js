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

const PlusPath = ({ center, radius, fill = "whitesmoke", ...props }) => {
  const path = dataPoints
    .map(
      ([x, y]) =>
        `${center.x + mult * radius * x},${center.y + mult * radius * y}`
    )
    .join(" ");
  return <path fill={fill} {...props} d={`M${path}z`} />;
};

export default PlusPath;
