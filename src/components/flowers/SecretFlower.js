import { useStorage } from "../../hooks/useStorage";
import { plusOneVisible } from "../../utils/plusOneVisible";
import HexedCanvas from "../svg/HexedCanvas";
import colors from "../../data/colors.json";
import classes from "./SecretFlower.module.css";

const radius = 95;
const centers = [
  { x: 110, y: 100 },
  { x: 110, y: 285 },
  { x: 110, y: 470 },
  { x: 110, y: 655 },
];

const SecretFlower = ({
  playerIndex,
  colorId,
  playerSecrets,
  clickHandler,
}) => {
  const { dispatch } = useStorage();
  const reduced = plusOneVisible(playerSecrets, (secret) => secret.taken).map(
    (secret, secretIndex) => {
      const taken = secret.taken;
      const checked = secret.taken && secret.cardId;
      const props = taken
        ? checked
          ? {
              fill: colors[colorId].color,
              stroke: "white",
              onClick: () =>
                dispatch("RESET_SECRET", { playerIndex, secretIndex }),
            }
          : {
              fill: `url(#pattern-stripe-${colorId})`,
              stroke: "white",
              onClick: () => clickHandler(playerIndex, secretIndex),
            }
        : {
            fill: "rgba(255, 255, 255, 0.01)",
            stroke: colors[colorId].color,
            onClick: () =>
              dispatch("SET_SECRET_TAKEN", { playerIndex, secretIndex }),
          };
      return { taken, checked, props };
    }
  );

  return (
    <div className={classes.main}>
      <HexedCanvas
        className={classes.canvas}
        hexBase={{ width: 220, height: 755, radius: 0 }}
      >
        <defs>
          <pattern
            id={`pattern-stripe-${colorId}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <rect
              width="15"
              height="20"
              transform="translate(0,0)"
              fill={colors[colorId].color}
            ></rect>
          </pattern>
        </defs>
        {reduced.map(({ taken, checked, props }, index) => {
          return (
            <g key={index}>
              {!taken && (
                <HexedCanvas.Hex
                  center={centers[index]}
                  radius={radius}
                  fill="none"
                  stroke="#aaaaaa"
                  strokeWidth="12px"
                />
              )}
              <HexedCanvas.Hex
                className={classes.hex}
                center={centers[index]}
                radius={radius}
                strokeWidth="8px"
                {...props}
              />
              {!taken && (
                <HexedCanvas.Plus
                  center={centers[index]}
                  radius={radius}
                  fill="whitesmoke"
                />
              )}
              {checked && (
                <HexedCanvas.Check
                  center={centers[index]}
                  radius={radius}
                  fill={colors[colorId].textColor ?? "white"}
                />
              )}
            </g>
          );
        })}
      </HexedCanvas>
    </div>
  );
};

export default SecretFlower;
