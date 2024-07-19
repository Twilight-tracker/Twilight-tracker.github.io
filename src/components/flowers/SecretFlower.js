import ExtraField from "./ExtraField";
import classes from "./SecretFlower.module.css";

const sqrt3 = Math.sqrt(3);
const radius = 95;
const centers = [
  { x: 110, y: 150 + 50 * sqrt3 },
  { x: 410, y: 150 + 50 * sqrt3 },
  { x: 260, y: 150 },
];

const SecretFlower = ({ playerIndex }) => {
  return (
    <div className={classes.main}>
      {/* <SvgCanvas viewbox="0 0 520 600">
        {centers.map((center, index) => (
          <HexPath
            key={index}
            className={classes.hex}
            center={center}
            radius={radius}
            {...colorProps}
          />
        ))}
      </SvgCanvas> */}
      <ExtraField
        defaultValue={0}
        aria-label="extra points"
        playerIndex={playerIndex}
      />
    </div>
  );
};

export default SecretFlower;
