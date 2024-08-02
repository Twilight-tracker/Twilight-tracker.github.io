import HexCard from "./HexCard";
import objectives from "../../../data/objectives.json";
import classes from "./CardTable.module.css";

const stageRank = { stage1: 0, stage2: 1, secret: 2 };

const CardTable = ({ filters, onConfirm }) => {
  const filterFunc = (card) =>
    filters[card.phase] && filters[card.stage] && filters[card.expansion];

  return (
    <section className={classes.main}>
      {Object.values(objectives)
        .filter(filterFunc)
        .sort(
          (first, second) =>
            (stageRank[first.stage] - stageRank[second.stage]) * 10 +
            (first.title.value > second.title.value) -
            (first.title.value < second.title.value)
        )
        .map((card) => (
          <HexCard key={card.id} cardId={card.id} onConfirm={onConfirm} />
        ))}
    </section>
  );
};

export default CardTable;
