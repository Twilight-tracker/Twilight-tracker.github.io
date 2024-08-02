import { useStorage } from "../../hooks/useStorage";
import { useTotalPoints } from "../../hooks/useTotalPoints";
import HexedCanvas from "../svg/HexedCanvas";
import { hexBase } from "../svg/constants";
import colors from "../../data/colors.json";

import classes from "./PointCounter.module.css";

const PointCounter = ({ className }) => {
  const { storage } = useStorage();
  const petals = storage.gameSettings.colors;
  const petalProps = petals.map((petal) => {
    const color = colors[petal.colorId];
    return {
      fill: color.color,
      hoverFill: color.hoverColor,
      textFill: color.textColor ?? "whitesmoke",
    };
  });
  const totalPoints = useTotalPoints();

  return (
    <div className={[className, classes.block].join(" ")}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Hex fill="rgba(64, 64, 128, 0.85)" />
        <HexedCanvas.Flower
          className={classes.clickable}
          petalProps={petalProps}
          playerTexts={totalPoints}
        />
      </HexedCanvas>
    </div>
  );
};

export default PointCounter;
