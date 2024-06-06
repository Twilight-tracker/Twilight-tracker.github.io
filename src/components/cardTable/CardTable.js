import HexCard from "./HexCard";
import objectives from "../../data/objectives.json";
import classes from "./CardTable.module.css";

const CardTable = ({ filters }) => {
  const filterFunc = (card) =>
    filters.phases[card.phase] &&
    filters.stages[card.stage] &&
    filters.expansions[card.expansion];

  return (
    <section className={classes.main}>
      {Object.values(objectives)
        .filter(filterFunc)
        .map((card) => (
          <HexCard key={card.id} cardId={card.id} />
        ))}
    </section>
  );
};

export default CardTable;
