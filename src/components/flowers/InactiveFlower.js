import { useStorage } from "../../hooks/useStorage";
import HexedCanvas from "../svg/HexedCanvas";
import { hexBase } from "../svg/constants";
import colors from "../../data/colors.json";

import classes from "./InactiveFlower.module.css";

const InactiveFlower = ({ cardIndex, onSelectCard }) => {
  const { storage } = useStorage();
  const points = storage.gameState.objectives[cardIndex].points;
  const petals = storage.gameSettings.colors;
  const petalProps = petals.map((petal, index) => {
    const color = colors[petal.colorId];
    return {
      fill: `color-mix(in srgb, ${color.color} ${
        points[index] ? "90%" : "20%"
      }, transparent)`,
    };
  });

  const hexClickHandler = () => {
    onSelectCard(cardIndex);
  };

  return (
    <div className={classes.main}>
      <HexedCanvas hexBase={hexBase}>
        <HexedCanvas.Flower
          petalProps={petalProps}
          className={classes.flower}
        />
        <HexedCanvas.Hex
          className={classes.hex}
          onClick={hexClickHandler}
          fill="rgba(64, 64, 80, 0.85)"
          hoverFill="rgba(64, 64, 128, 0.85)"
        />
        <HexedCanvas.Plus
          fill={cardIndex < 5 ? "goldenrod" : "#6060f0"}
        />
      </HexedCanvas>
    </div>
  );
};

export default InactiveFlower;
