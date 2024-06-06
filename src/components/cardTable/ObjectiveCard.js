import objectives from "../../data/objectives.json";
import classes from "./ObjectiveCard.module.css";

const phases = {
  status: { value: "Фаза статуса", color: "" },
  action: { value: "Фаза действий", color: "" },
  agenda: { value: "Фаза политики", color: "" },
};

const stages = {
  stage1: { points: 1, color: "goldenrod", label: "победное очко" },
  stage2: { points: 2, color: "blue", label: "победных очка" },
  secret: { points: 1, color: "red", label: "победное очко" },
};

const expansions = {
  main: {},
  pok: { label: "A" },
  omega: { label: "Ω" },
};
const ObjectiveCard = ({ cardId }) => {
  const card = objectives[cardId];
  const stage = stages[card.stage];
  const expansion = expansions[card.expansion];

  return (
    <section className={classes.main} style={{ borderColor: stage.color }}>
      <div className={classes.title}>{card.title.value}</div>
      <div className={classes.phase}>{phases[card.phase].value}</div>
      <div className={classes.descriptionBlock}>
        <div className={classes.description}>{card.description.value}</div>
        {card.extra && <div className={classes.extra}>{card.extra.value}</div>}
      </div>
      <div className={classes.points}>{stage.points}</div>
      <div className={classes.pointsLabel}>{stage.label}</div>
      {expansion?.label && (
        <div className={classes.expansion}>{expansion.label}</div>
      )}
    </section>
  );
};

export default ObjectiveCard;
