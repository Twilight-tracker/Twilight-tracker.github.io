import { useStorage } from "../../hooks/useStorage";
import { useTotalPoints } from "../../hooks/useTotalPoints";
import SvgCanvas from "../svg/SvgCanvas";
import HexPath from "../svg/HexPath";
import FlowerPath from "../svg/FlowerPath";
import { baseParameters } from "../svg/constants";
import colors from "../../data/colors.json";

import classes from "./PointCounter.module.css";

const PointCounter = () => {
  const [storage, dispatch] = useStorage();
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
    <div className={classes.block}>
      <SvgCanvas className={classes.canvas} viewbox="0 0 520 600">
        <HexPath {...baseParameters} fill="#000080" />
        <FlowerPath
          className={classes.clickable}
          petalProps={petalProps}
          {...baseParameters}
          playerTexts={totalPoints}
        />
      </SvgCanvas>
    </div>
  );
};

export default PointCounter;
