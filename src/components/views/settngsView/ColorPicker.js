import { useStorage } from "../../../hooks/useStorage";
import HexedCanvas from "../../svg/HexedCanvas";
import { useWheelContext } from "./FactionPicker";
import classes from "./ColorPicker.module.css";

const ColorPicker = ({ className }) => {
  const { dispatch } = useStorage();

  const { colorActivated, setColorActivated } = useWheelContext();

  const colorPickHandler = (event) => {
    dispatch("SET_COLOR", {
      position: colorActivated,
      colorId: event.target.id,
    });
    setColorActivated(-1);
    event.preventDefault();
  };

  const hexBase = { width: 52, height: 60, radius: 10 };

  return (
    <HexedCanvas className={classes.canvas} hexBase={hexBase}>
      <HexedCanvas.ColorHexes
        className={classes.colorHexes}
        playerIndex={3}
        onClick={colorPickHandler}
      />
    </HexedCanvas>
  );
};

export default ColorPicker;
