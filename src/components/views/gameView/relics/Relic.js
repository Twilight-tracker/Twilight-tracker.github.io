import { useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import ColorSelection from "./ColorSelection";
import relics from "../../../../data/relics.json";
import { relicsAssets } from "../../../../assets/relics";
import classes from "./Relic.module.css";
import colorClasses from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const Relic = ({ className, relicId }) => {
  const { storage, dispatch } = useStorage();
  const stateIndex = storage.gameState.relics[relicId];
  const colors = storage.gameSettings.colors;
  const colorId = stateIndex > -1 ? colors[stateIndex].colorId : "";

  const { title } = relics[relicId];
  const { src, alt } = relicsAssets[relicId];
  const [showPetals, setShowPetals] = useState(false);

  const clickHandler = () => {
    if (showPetals) {
      dispatch("RESET_RELIC", { relicId });
    }
    setShowPetals((value) => !value);
  };
  const onSelection = (playerIndex) =>
    dispatch("SET_RELIC", { relicId, playerIndex });
  const confirmHandler = () => setShowPetals(false);

  const groupClass = cx({
    group: true,
    idleGroup: !showPetals,
    [colorClasses[colorId]]: !showPetals && stateIndex > -1,
    coloredGroup: !showPetals && stateIndex > -1,
  });

  const imageClass = cx({
    image: true,
    coloredImage: !showPetals && stateIndex > -1,
    atSelectionImage: showPetals,
  });

  return (
    <div className={className}>
      <div className={groupClass}>
        <img
          className={imageClass}
          src={src}
          alt={alt}
          onClick={clickHandler}
        />
        {!showPetals && (
          <div className={classes.label} onClick={clickHandler}>
            {title}
          </div>
        )}
      </div>
      {showPetals && (
        <ColorSelection
          className={classes.petals}
          onSelection={onSelection}
          onConfirm={confirmHandler}
        />
      )}
    </div>
  );
};

export default Relic;
