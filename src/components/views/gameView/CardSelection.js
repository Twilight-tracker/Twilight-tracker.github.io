import Overlay from "../../ui/Overlay";
import CardsView from "../cardsView/CardsView";
import classes from "./CardSelection.module.css";

const CardSelection = ({ cardIndex, onDiscard, onConfirm }) => {
  const filters =
    cardIndex >= 5
      ? { stage1: false, stage2: true, secret: false }
      : { stage1: true, stage2: false, secret: false };

  return (
    <Overlay
      className={classes.container}
      onDiscard={onDiscard}
      onConfirm={onConfirm}
    >
      <CardsView onPage={false} filters={filters} cardIndex={cardIndex} />
    </Overlay>
  );
};

export default CardSelection;
