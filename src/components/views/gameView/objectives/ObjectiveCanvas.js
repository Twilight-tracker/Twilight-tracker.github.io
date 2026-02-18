import { useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import HexedCanvas from "../../../svg/HexedCanvas";
import { hexWithPetals } from "../../../svg/constants";
import objectives from "../../../../data/objectives.json";
import classes from "./ObjectiveCanvas.module.css";
import colors from "../../../../data/colors.module.css";
import petals from "./petals.module.css";

const cx = classNames.bind(classes);

const ObjectiveCanvas = ({ className, cardIndex, onSelectCard }) => {

  const [clickCount, setClickCount] = useState(0);
  const { storage, dispatch } = useStorage();

  const petalColors = storage.gameSettings.colors;
  const { cardId, points } = storage.gameState.objectives[cardIndex];

  const isActiveFlower = cardId;
  const stage = objectives[cardId]?.stage;

  const hexClickHandler = isActiveFlower
    ? () => {
        if (clickCount === 0) {
          setClickCount(1);
          setTimeout(() => {
            setClickCount(0);
          }, 1000);
          return;
        }
        setClickCount(0);
        dispatch("RESET_OBJECTIVE", { cardIndex });
      }
    : () => {
        onSelectCard(cardIndex);
      };

  const petalClickHandlers = isActiveFlower
    ? petalColors.map(
        (_, index) => () =>
          dispatch("TOGGLE_OBJECTIVE_POINTS", {
            cardIndex,
            playerIndex: index,
          })
      )
    : undefined;

  const hexClass = cx({
    hex: true,
    "hex-stage1-inactive": !isActiveFlower && cardIndex < 5,
    "hex-stage2-inactive": !isActiveFlower && cardIndex >= 5,
    [`hex-${stage}-active`]: isActiveFlower,
    "hex-beforeDelete": isActiveFlower && clickCount,
  });

  const petalClasses = petalColors.map((color, index) =>
    cx({
      flower: true,
      activePetal: isActiveFlower,
      checkedPetal: isActiveFlower && points[index],
      uncheckedPetal: !isActiveFlower || !points[index],
      [colors[color.colorId]]: true,
      [petals[`petalIndex${index}`]]: true
    })
  );

  const plusClass = cx({
    "plus-stage1": cardIndex < 5,
    "plus-stage2": cardIndex >= 5,
  });

  return (
    <div className={className}>
      <HexedCanvas className={classes.canvas} hexBase={hexWithPetals}>
        <HexedCanvas.Flower
          petalClasses={petalClasses}
          petalClickHandlers={petalClickHandlers}
        />
        <HexedCanvas.Hex className={hexClass} onClick={hexClickHandler} />
        {!isActiveFlower && <HexedCanvas.Plus className={plusClass} />}
      </HexedCanvas>
    </div>
  );
};

export default ObjectiveCanvas;
