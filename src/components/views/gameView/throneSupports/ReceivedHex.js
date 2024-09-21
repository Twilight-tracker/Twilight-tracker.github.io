import { useStorage } from "../../../../hooks/useStorage";
import HexedCanvas from "../../../svg/HexedCanvas";
import classes from "./ReceivedHex.module.css";
import colors from "../../../../data/colors.module.css";

const ReceivedHex = ({ supporterIndex, center, radius }) => {
  const { storage, dispatch } = useStorage();
  const colorId = storage.gameSettings.colors[supporterIndex].colorId;

  const clickHandler = () => {
    dispatch("RESET_THRONE_SUPPORT", { supporterIndex });
  };

  return (
    <g className={colors[colorId]}>
      <HexedCanvas.Hex
        className={classes.hex}
        center={center}
        radius={radius}
        sitOnEdge={false}
        onClick={clickHandler}
      />

      <HexedCanvas.Check
        className={classes.check}
        center={center}
        radius={radius}
      />
    </g>
  );
};

export default ReceivedHex;
