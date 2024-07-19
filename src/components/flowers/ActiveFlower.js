import { useStorage } from "../../hooks/useStorage";
import CardContent from "../views/cardsView/CardContent";
import SvgCanvas from "../svg/SvgCanvas";
import HexPath from "../svg/HexPath";
import FlowerPath from "../svg/FlowerPath";
import { baseParameters } from "../svg/constants";
  import objectives from "../../data/objectives.json";
import colors from "../../data/colors.json";

import classes from "./ActiveFlower.module.css";

const stageColors = {
  stage1: "goldenrod",
  stage2: "blue",
  secret: "red",
};

const ActiveFlower = ({ cardIndex }) => {
  const [storage, dispatch] = useStorage();
  const { cardId, points } = storage.gameState.objectives[cardIndex];

  const petals = storage.gameSettings.colors;
  const petalProps = petals.map((petal, index) => {
    const color = colors[petal.colorId];
    return {
      fill: `color-mix(in srgb, ${color.color} ${
        points[index] ? "90%" : "20%"
      }, transparent)`,
      hoverFill: color.hoverColor,
    };
  });

  const hexClickHandler = () =>
    dispatch("RESET_OBJECTIVE", { cardIndex: cardIndex });

  const petalClickHandler = (index) =>
    dispatch("TOGGLE_POINTS", { cardIndex: cardIndex, playerIndex: index });

  const card = objectives[cardId];
  const fillAndStroke = card
    ? { fill: "#fff", stroke: stageColors[card.stage], strokeWidth: "3px" }
    : { fill: "#3f3f3f" };

  return (
    <div className={classes.main}>
      <SvgCanvas viewbox="0 0 520 600">
        <HexPath
          className={classes.hex}
          onClick={hexClickHandler}
          {...baseParameters}
          {...fillAndStroke}
        />
        <FlowerPath
          petalProps={petalProps}
          className={classes.flower}
          // className={classes.clickable}
          {...baseParameters}
          onPetalClick={petalClickHandler}
        />
      </SvgCanvas>
      {card && <CardContent className={classes.content} card={card} />}
    </div>
  );
};

export default ActiveFlower;
