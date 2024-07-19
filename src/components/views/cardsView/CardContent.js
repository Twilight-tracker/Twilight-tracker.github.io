import classes from "./CardContent.module.css";

const phases = {
  status: { value: "Фаза статуса", color: "" },
  action: { value: "Фаза действий", color: "" },
  agenda: { value: "Фаза политики", color: "" },
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

const CardContent = ({ className, card }) => {
  const stage = stages[card.stage];
  const expansion = expansions[card.expansion];

  return (
    <div className={className}>
      <div className={classes.content}>
        <div className={classes.title}>{card.title.value}</div>
        <div className={classes.phase}>{phases[card.phase].value}</div>
        <div className={classes.descriptionBlock}>
          <div className={classes.description}>{card.description.value}</div>
          {card.extra && (
            <div className={classes.extra}>{card.extra.value}</div>
          )}
        </div>
        <div className={classes.points}>{stage.points}</div>
        <div className={classes.pointsLabel}>{stage.label}</div>
        {expansion?.label && (
          <div className={classes.expansion}>{expansion.label}</div>
        )}
      </div>
    </div>
  );
};

export default CardContent;
