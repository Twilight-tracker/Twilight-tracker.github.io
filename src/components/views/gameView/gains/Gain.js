import { useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import ColorSelection from "./ColorSelection";
import StaticPetals from "./StaticPetals";
import gains from "../../../../data/gains.json";
import { gainsAssets } from "../../../../assets/gains";
import classes from "./Gain.module.css";
import colorClasses from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const Gain = ({ className, gainId }) => {
  const { storage, dispatch } = useStorage();
  const stateIndex = storage.gameState.gains[gainId];
  const colors = storage.gameSettings.colors;
  const colorId = stateIndex > -1 ? colors[stateIndex].colorId : "";

  const { title } = gains[gainId];
  const { src, alt } = gainsAssets[gainId];
  const [showColorSelection, setShowColorSelection] = useState(false);

  const clickHandler = () => {
    if (showColorSelection) {
      dispatch("RESET_GAIN", { gainId });
    }
    setShowColorSelection((value) => !value);
  };
  const onSelection = (playerIndex) =>
    dispatch("SET_GAIN", { gainId, playerIndex });
  const confirmHandler = () => setShowColorSelection(false);

  const groupClass = cx({
    group: true,
    idleGroup: !showColorSelection,
    [colorClasses[colorId]]: stateIndex > -1,
  });

  const imageClass = cx({
    image: true,
    coloredImage: !showColorSelection && stateIndex > -1,
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
        {!showColorSelection && stateIndex > -1 && (
          <StaticPetals
            className={classes.staticPetals}
            onClick={clickHandler}
          />
        )}
        {!showColorSelection && (
          <div className={classes.label} onClick={clickHandler}>
            {title.value}
          </div>
        )}
      </div>
      {showColorSelection && (
        <ColorSelection
          className={classes.petals}
          onSelection={onSelection}
          onConfirm={confirmHandler}
        />
      )}
    </div>
  );
};

export default Gain;
