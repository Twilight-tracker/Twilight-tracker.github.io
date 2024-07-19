import HexCard from "./HexCard";
import objectives from "../../../data/objectives.json";
import classes from "./CardTable.module.css";

const CardTable = ({ filters, onConfirm}) => {
  const filterFunc = (card) =>
    filters[card.phase] &&
    filters[card.stage] &&
    filters[card.expansion];

  return (
    <section className={classes.main}>
      {Object.values(objectives)
        .filter(filterFunc)
        .map((card) => (
          <HexCard key={card.id} cardId={card.id} onConfirm={onConfirm} />
        ))}
    </section>
  );
};

export default CardTable;
