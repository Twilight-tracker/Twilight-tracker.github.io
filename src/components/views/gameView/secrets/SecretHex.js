import { useStorage } from "../../../../hooks/useStorage";
import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import classes from "./SecretHex.module.css";

const cx = classNames.bind(classes);

const SecretHex = ({
  playerIndex,
  secretIndex,
  secret,
  onClick,
  center,
  radius,
}) => {
  const { dispatch } = useStorage();
  const taken = secret.taken;
  const checked = taken && secret.cardId;
  const clickHandler = taken
    ? checked
      ? () => dispatch("RESET_SECRET", { playerIndex, secretIndex })
      : () => onClick(playerIndex, secretIndex)
    : () => dispatch("SET_SECRET_TAKEN", { playerIndex, secretIndex });

  const hexClass = cx({
    hex: true,
    taken: taken && !checked,
    checked: taken && checked,
    new: !taken,
  });

  return (
    <g>
      {!taken && (
        <HexedCanvas.Hex
          className={classes.mount}
          center={center}
          radius={radius}
          sitOnEdge={false}
        />
      )}
      <HexedCanvas.Hex
        className={hexClass}
        center={center}
        radius={radius}
        sitOnEdge={false}
        onClick={clickHandler}
      />
      {!taken && (
        <HexedCanvas.Plus
          className={classes.plus}
          center={center}
          radius={radius}
        />
      )}
      {checked && (
        <HexedCanvas.Check
          className={classes.check}
          center={center}
          radius={radius}
        />
      )}
    </g>
  );
};

export default SecretHex;
