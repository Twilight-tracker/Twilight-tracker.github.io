import { useStorage } from "../../../hooks/useStorage";
import { useTotalPoints } from "../../../hooks/useTotalPoints";
import HexedCanvas from "../../svg/HexedCanvas";
import colors from "../../../data/colors.json";
import { factionsAssets } from "../../../assets/factions";
import classes from "./FactionPointCounter.module.css";

const FactionPointCounter = ({ className }) => {
  const { storage } = useStorage();
  const { colors: colorHexes, factions } = storage.gameSettings;
  const totalPoints = useTotalPoints();

  const hexBase = { width: 52, height: 60, radius: 20 };

  return (
    <div className={className}>
      <div className={classes.grid}>
        {[...Array(6).keys()].map((index) => {
          const factionId = factions[index].factionId;
          const colorId = colorHexes[index].colorId;
          const color = colors[colorId];
          return (
            <div className={classes.container} key={index}>
              <img
                className={classes.image}
                id={index}
                {...factionsAssets[factionId]}
              />
              <HexedCanvas className={classes.canvas} hexBase={hexBase}>
                <HexedCanvas.Hex
                  id={index}
                  className={classes.hex}
                  fill={color.color}
                  stroke="whitesmoke"
                />
              </HexedCanvas>
              <div
                style={{ color: color.textColor ?? "whitesmoke" }}
                className={classes.points}
              >
                {totalPoints[index]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FactionPointCounter;
