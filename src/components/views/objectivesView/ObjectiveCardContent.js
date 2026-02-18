import classNames from "classnames/bind";
import ObjectiveCardDescription from "./ObjectiveCardDescription";
import ObjectiveCardTitle from "./ObjectiveCardTitle";
import classes from "./ObjectiveCardContent.module.css";

const cx = classNames.bind(classes);

const phases = {
  status: "Фаза статуса",
  action: "Фаза действий",
  agenda: "Фаза политики",
};

const stages = {
  stage1: { points: 1, color: "goldenrod", label: "очко" },
  stage2: { points: 2, color: "blue", label: "очка" },
  secret: { points: 1, color: "red", label: "очко" },
};

const expansions = {
  main: {},
  pok: { label: "A" },
  omega: { label: "Ω" },
};

const ObjectiveCardContent = ({ className, card, date = -1 }) => {
  const stage = stages[card.stage];
  const expansion = expansions[card.expansion];

  const dateObj = new Date(date);
  const dateStr = `${("00" + dateObj.getHours()).slice(-2)}:${(
    "00" + dateObj.getMinutes()
  ).slice(-2)}`;

  const pointsClass = cx({
    pointsAtCenter: date === -1,
    pointsAtLeft: date !== -1,
  });

  return (
    <div className={className}>
      <div className={classes.content}>
        <ObjectiveCardTitle className={classes.title}>
          {card.title.value}
        </ObjectiveCardTitle>
        <div className={classes.phase}>{phases[card.phase]}</div>
        <ObjectiveCardDescription className={classes.description} card={card} />
        {date === -1 && (
          <div className={pointsClass}>
            <div className={classes.pointsValue}>{stage.points}</div>
            <div className={classes.pointsLabel}>{stage.label}</div>
          </div>
        )}
        {date !== -1 && <div className={classes.date}>{dateStr}</div>}
        {expansion?.label && (
          <div className={classes.expansion}>{expansion.label}</div>
        )}
      </div>
    </div>
  );
};

export default ObjectiveCardContent;
