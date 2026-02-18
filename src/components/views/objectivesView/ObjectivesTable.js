import ObjectiveCard from "./ObjectiveCard";
import objectives from "../../../data/objectives.json";
import classes from "./ObjectivesTable.module.css";

const stageRank = { stage1: 0, stage2: 1, secret: 2 };
const sortByRankAndTitle = (first, second) =>
            (stageRank[first.stage] - stageRank[second.stage]) * 10 +
            (first.title.value > second.title.value) -
            (first.title.value < second.title.value);

const ObjectivesTable = ({ filters, onConfirm }) => {
  const filterFunc = (card) =>
    filters[card.phase] && filters[card.stage] && filters[card.expansion];

  return (
    <div className={classes.main}>
      {Object.values(objectives)
        .filter(filterFunc)
        .sort(sortByRankAndTitle)
        .map((card) => (
          <ObjectiveCard key={card.id} cardId={card.id} onConfirm={onConfirm} />
        ))}
    </div>
  );
};

export default ObjectivesTable;
