import { useStorage } from "../../../../hooks/useStorage";
import { useTotalPoints } from "../../../../hooks/useTotalPoints";
import HexGrid from "../../../core/HexGrid";
import PointCounterItem from "./PointCounterItem";
import Clock from "./Clock";
import classes from "./PointCounter.module.css";

const PointCounter = ({ className }) => {
  const { storage } = useStorage();
  const { colors, factions } = storage.gameSettings;
  const { totalPoints } = useTotalPoints();

  return (
    <div className={className}>
      <HexGrid className={classes.grid}>
        {[...Array(6).keys()].map((index) => (
          <PointCounterItem
            key={index}
            position={index}
            colorId={colors[index].colorId}
            factionId={factions[index].factionId}
            points={totalPoints[index]}
          />
        ))}
        <Clock className={classes.clock} />
      </HexGrid>
    </div>
  );
};

export default PointCounter;
