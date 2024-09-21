import classNames from "classnames/bind";
import { useGameViewContext } from "../GameView";
import HexedCanvas from "../../../svg/HexedCanvas";
import { hexWithoutPetals } from "../../../svg/constants";
import classes from "./MagnifierButton.module.css";

const cx = classNames.bind(classes);

const MagnifierButton = ({ className }) => {
  const { magnifierActive, setMagnifierActive } = useGameViewContext();

  const hexClass = cx({
    hex: true,
    active: magnifierActive,
    inactive: !magnifierActive,
  });

  return (
    <div className={className}>
      <HexedCanvas className={classes.canvas} hexBase={hexWithoutPetals}>
        <HexedCanvas.Hex
          className={hexClass}
          onClick={() => setMagnifierActive((val) => !val)}
        />
        <HexedCanvas.Magnifier className={classes.magnifier} />
      </HexedCanvas>
    </div>
  );
};

export default MagnifierButton;
