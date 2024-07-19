import HexPath from "../../svg/HexPath";
import SvgCanvas from "../../svg/SvgCanvas";
import objectives from "../../../data/objectives.json";
import classes from "./HexCard.module.css";
import CardContent from "./CardContent";

const stages = {
  stage1: { points: 1, color: "goldenrod", label: "очко" },
  stage2: { points: 2, color: "blue", label: "очка" },
  secret: { points: 1, color: "red", label: "очко" },
};

const HexCard = ({ cardId, onConfirm }) => {
  const card = objectives[cardId];
  const stage = stages[card.stage];

  const clickHandler = () => {
    if (onConfirm) {
      onConfirm(cardId);
    }
  };

  return (
    <div className={classes.main}>
      <SvgCanvas className={classes.canvas} viewbox="0 0 606 526">
        <HexPath
          className={onConfirm ? classes.pointer : ""}
          center={{ x: 303, y: 263 }}
          radius={300}
          fill="#fff"
          stroke={stage.color}
          strokeWidth="3px"
          onClick={clickHandler}
        />
      </SvgCanvas>
      <CardContent className={classes.content} card={card} />
    </div>
  );
};

export default HexCard;
