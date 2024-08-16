import Overlay from "../../ui/Overlay";
import CardsView from "../cardsView/CardsView";
import classes from "./CardSelection.module.css";

const CardSelection = ({ filters, onDiscard, onConfirm }) => {
  return (
    <Overlay
      className={classes.container}
      containerId="cards"
      onDiscard={onDiscard}
      onConfirm={onConfirm}
    >
      <CardsView onPage={false} filters={filters} />
    </Overlay>
  );
};

export default CardSelection;
