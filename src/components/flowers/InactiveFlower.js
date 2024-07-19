import { useStorage } from "../../hooks/useStorage";
import SvgCanvas from "../svg/SvgCanvas";
import HexPath from "../svg/HexPath";
import FlowerPath from "../svg/FlowerPath";
import PlusPath from "../svg/PlusPath";
import { baseParameters } from "../svg/constants";
import colors from "../../data/colors.json";

import classes from "./InactiveFlower.module.css";

const InactiveFlower = ({ cardIndex, onSelectCard }) => {
  const [storage, dispatch] = useStorage();
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
      <SvgCanvas viewbox="0 0 520 600">
        <HexPath
          className={classes.hex}
          onClick={hexClickHandler}
          {...baseParameters}
          fill="#3f3f3f"
          />
        <PlusPath
          className={classes.clickable}
          onClick={hexClickHandler}
          fill={cardIndex < 5 ? "goldenrod" : "#6060f0"}
          {...baseParameters}
        />
        <FlowerPath
          petalProps={petalProps}
          className={classes.flower}
          // className={classes.clickable}
          {...baseParameters}
          // onClick={petalClickHandler}
        />
      </SvgCanvas>
    </div>
  );
};

export default InactiveFlower;
