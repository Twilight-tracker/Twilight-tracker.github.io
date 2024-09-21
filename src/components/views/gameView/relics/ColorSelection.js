import { useStorage } from "../../../../hooks/useStorage";
import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import classes from "./ColorSelection.module.css";
import colorClasses from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const ColorSelection = ({ className, onSelection, onConfirm }) => {
  const { storage } = useStorage();
  const colors = storage.gameSettings.colors;

  const petalClasses = colors.map(({ colorId }) =>
    cx({
      petal: true,
      [colorClasses[colorId]]: true,
    })
  );

  const petalClickHandlers = colors.map((_, playerIndex) => () => {
    onSelection(playerIndex);
    onConfirm();
  });

  const hexBase = { width: 600, height: 520, radius: 200 };

  return (
    <div className={className}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Flower
          petalClasses={petalClasses}
          petalClickHandlers={petalClickHandlers}
        />
      </HexedCanvas>
    </div>
  );
};

export default ColorSelection;
