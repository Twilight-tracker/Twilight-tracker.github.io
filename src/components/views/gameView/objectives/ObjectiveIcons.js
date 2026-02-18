import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import HexGrid from "../../../core/HexGrid";
import { factionsAssets } from "../../../../assets/factions";
import classes from "./ObjectiveIcons.module.css";
import petals from "./petals.module.css";

const cx = classNames.bind(classes);

const ObjectiveIcons = ({ className, cardIndex }) => {
  const { storage } = useStorage();
  const factions = storage.gameSettings.factions;
  const { cardId: isActiveFlower, points } = storage.gameState.objectives[cardIndex];

  const imageClasses = factions.map((_, index) =>
    cx({
      image: true,
      checkedPetal: isActiveFlower && points[index],
      [petals[`onHoverIndex${index}`]]: !isActiveFlower || !points[index],
    })
  );

  return (
    <div className={className}>
      <HexGrid className={classes.grid}>
        {factions
          .map(({ factionId }) => factionsAssets[factionId].icon)
          .map(({ src, alt }, index) => (
            <HexGrid.Item key={index}>
              <img className={imageClasses[index]} src={src} alt={alt} />
            </HexGrid.Item>
          ))}
      </HexGrid>
    </div>
  );
};

export default ObjectiveIcons;
