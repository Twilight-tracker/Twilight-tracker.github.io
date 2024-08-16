import classNames from "classnames/bind";
import HexedCanvas from "../../svg/HexedCanvas";
import CardContent from "./CardContent";
import objectives from "../../../data/objectives.json";
import classes from "./HexCard.module.css";
import colors from "../../../data/colors.module.css";

const cx = classNames.bind(classes);

const HexCard = ({ cardId, onConfirm, colorId }) => {
  const card = objectives[cardId];
  const stage = card.stage;

  const clickHandler = () => {
    if (onConfirm) {
      onConfirm(cardId);
    }
  };

  const mainClass = cx({
    main: true,
    [colors[colorId]]: colorId,
  })

  const hexClass = cx({
    hex: true,
    [`${stage}-fill`]: !colorId,
    colorFill: colorId,
    [`${stage}-stroke`]: true,
    pointer: onConfirm,
  });

  const contentClass = cx({
    content: true,
    defaultContent: !colorId,
    coloredContent: colorId
  });

  const hexBase = { width: 610, height: 530, radius: 300 };

  return (
    <div className={mainClass}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Hex
          className={hexClass}
          onClick={clickHandler}
        />
      </HexedCanvas>
      <CardContent className={contentClass} card={card} />
    </div>
  );
};

export default HexCard;
