import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import { useGameViewContext } from "../GameView";
import CardContent from "../../cardsView/CardContent";
import Timer from "./Timer";
import ObjectiveCanvas from "./ObjectiveCanvas";
import ObjectiveIcons from "./ObjectiveIcons";
import objectives from "../../../../data/objectives.json";
import classes from "./ObjectiveFlower.module.css";
import petals from "./petals.module.css";

const cx = classNames.bind(classes);

const ObjectiveFlower = ({ cardIndex, onSelectCard }) => {
  const { magnifierActive } = useGameViewContext();

  const { storage } = useStorage();
  const { cardId, date } = storage.gameState.objectives[cardIndex];
  const dateBefore =
    cardIndex === 0 ? -1 : storage.gameState.objectives[cardIndex - 1].date;

  const isActiveFlower = cardId;
  const card = objectives[cardId] ?? { stage: "" };

  const mainClass = cx({
    main: true,
    [petals.onHover]: isActiveFlower,
    magnified: isActiveFlower && magnifierActive,
  });

  return (
    <div className={mainClass}>
      <ObjectiveCanvas cardIndex={cardIndex} onSelectCard={onSelectCard} />
      <ObjectiveIcons className={classes.icons} cardIndex={cardIndex} />
      {isActiveFlower && (
        <CardContent className={classes.content} card={card} date={date} />
      )}
      {!isActiveFlower && (
        <Timer className={classes.content} dateBefore={dateBefore} />
      )}
    </div>
  );
};

export default ObjectiveFlower;
