import { useState } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useGameViewContext } from "../views/gameView/GameView";
import CardContent from "../views/cardsView/CardContent";
import HexedCanvas from "../svg/HexedCanvas";
import { hexBase } from "../svg/constants";
import objectives from "../../data/objectives.json";
import colors from "../../data/colors.json";

import classes from "./ActiveFlower.module.css";

const stageColors = {
  stage1: "goldenrod",
  stage2: "blue",
  secret: "red",
};

const ActiveFlower = ({ cardIndex }) => {
  const { magnifierActive } = useGameViewContext();

  const [clickCount, setClickCount] = useState(0);
  const { storage, dispatch } = useStorage();
  const { cardId, points } = storage.gameState.objectives[cardIndex];

  const petals = storage.gameSettings.colors;
  const petalProps = petals.map((petal, index) => {
    const color = colors[petal.colorId];
    return {
      fill: `color-mix(in srgb, ${color.color} ${
        points[index] ? "98%" : "20%"
      }, transparent)`,
      hoverFill: color.hoverColor,
    };
  });

  const hexClickHandler = () => {
    if (clickCount === 0) {
      setClickCount(1);
      setTimeout(() => {
        setClickCount(0);
      }, 1000);
      return;
    }
    setClickCount(0);
    dispatch("RESET_OBJECTIVE", { cardIndex: cardIndex });
  };

  const petalClickHandler = (index) =>
    dispatch("TOGGLE_POINTS", { cardIndex: cardIndex, playerIndex: index });

  const card = objectives[cardId];
  const fillAndStroke = card
    ? {
        fill: clickCount
          ? "rgba(128, 64, 64, 1)"
          : "rgba(64, 64, 128, 1)",
        stroke: stageColors[card.stage],
        strokeWidth: "2px",
      }
    : { fill: "rgba(128, 64, 64, 1)" };

  const canvasClass = [classes.canvas, magnifierActive ? classes.magnified : ""].join(" ");
  return (
    <div className={classes.main}>
      <HexedCanvas className={canvasClass} hexBase={hexBase}>
        <HexedCanvas.Flower
          petalProps={petalProps}
          className={classes.flower}
          onPetalClick={petalClickHandler}
        />
        <HexedCanvas.Hex
          className={classes.hex}
          onClick={hexClickHandler}
          {...fillAndStroke}
        />
      </HexedCanvas>
      {card && <CardContent className={classes.content} card={card} />}
    </div>
  );
};

export default ActiveFlower;
