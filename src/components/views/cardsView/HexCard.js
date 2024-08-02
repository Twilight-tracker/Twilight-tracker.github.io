import classNames from "classnames/bind";
import HexedCanvas from "../../svg/HexedCanvas";
import CardContent from "./CardContent";
import objectives from "../../../data/objectives.json";
import classes from "./HexCard.module.css";

const cx = classNames.bind(classes);

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

  const hexClass = cx({
    hex: true,
    pointer: onConfirm,
  });

  const hexBase = { width: 610, height: 530, radius: 300 };

  return (
    <div className={classes.main}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Hex
          className={hexClass}
          stroke={stage.color}
          onClick={clickHandler}
        />
      </HexedCanvas>
      <CardContent className={classes.content} card={card} />
    </div>
  );
};

export default HexCard;
