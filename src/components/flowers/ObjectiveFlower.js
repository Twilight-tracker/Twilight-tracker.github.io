import { useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../hooks/useStorage";
import { useGameViewContext } from "../views/gameView/GameView";
import CardContent from "../views/cardsView/CardContent";
import HexedCanvas from "../svg/HexedCanvas";
import Timer from "./Timer";
import { hexWithPetals } from "../svg/constants";
import objectives from "../../data/objectives.json";
import classes from "./ObjectiveFlower.module.css";
import colors from "../../data/colors.module.css";

const cx = classNames.bind(classes);

const ObjectiveFlower = ({ cardIndex, onSelectCard }) => {
  const { magnifierActive } = useGameViewContext();

  const [clickCount, setClickCount] = useState(0);
  const { storage, dispatch } = useStorage();

  const petals = storage.gameSettings.colors;
  const { cardId, points, date } = storage.gameState.objectives[cardIndex];
  const dateBefore = cardIndex === 0 ? -1 : storage.gameState.objectives[cardIndex - 1].date;

  const isActiveFlower = cardId;
  const card = objectives[cardId] ?? { stage: "" };

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
        dispatch("RESET_OBJECTIVE", { cardIndex: cardIndex });
      }
    : () => {
        onSelectCard(cardIndex);
      };

  const petalClickHandlers = isActiveFlower
    ? petals.map(
        (_, index) => () =>
          dispatch("TOGGLE_POINTS", {
            cardIndex: cardIndex,
            playerIndex: index,
          })
      )
    : undefined;

  const hexClass = cx({
    hex: true,
    "hex-stage1-inactive": !isActiveFlower && cardIndex < 5,
    "hex-stage2-inactive": !isActiveFlower && cardIndex >= 5,
    [`hex-${card.stage}-active`]: isActiveFlower,
    "hex-beforeDelete": isActiveFlower && clickCount,
  });

  const canvasClass = cx({
    canvas: true,
    magnified: isActiveFlower && magnifierActive,
  });

  const petalClasses = petals.map((color, index) =>
    cx({
      flower: true,
      activePetal: isActiveFlower,
      checkedPetal: isActiveFlower && points[index],
      uncheckedPetal: !isActiveFlower || !points[index],
      [colors[color.colorId]]: true,
    })
  );

  const plusClass = cx({
    "plus-stage1": cardIndex < 5,
    "plus-stage2": cardIndex >= 5,
  });

  return (
    <div className={classes.main}>
      <HexedCanvas className={canvasClass} hexBase={hexWithPetals}>
        <HexedCanvas.Flower
          petalClasses={petalClasses}
          petalClickHandlers={petalClickHandlers}
        />
        <HexedCanvas.Hex className={hexClass} onClick={hexClickHandler} />
        {!isActiveFlower && <HexedCanvas.Plus className={plusClass} />}
      </HexedCanvas>
      {isActiveFlower && (
        <CardContent className={classes.content} card={card} date={date} />
      )}
      {!isActiveFlower && <Timer className={classes.content} dateBefore={dateBefore} />}
    </div>
  );
};

export default ObjectiveFlower;
