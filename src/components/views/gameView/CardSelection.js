import { useState } from "react";
import ReactDOM from "react-dom";
import CardsView from "../cardsView/CardsView";
import Backdrop from "../../Layout/Backdrop";
import classes from "./CardSelection.module.css";

const CardSelection = ({ cardIndex, onDiscard, onConfirm }) => {
  const [removing, setRemoving] = useState(false);

  const filters =
    cardIndex >= 5
      ? { stage1: false, stage2: true, secret: false }
      : { stage1: true, stage2: false, secret: false };
  const discardHandler = () => {
    setTimeout(() => {
      setRemoving(false);
      onDiscard();
    }, 300);
    setRemoving(true);
  };

  const confirmHandler = (cardId) => {
    setTimeout(() => {
      setRemoving(false);
      onConfirm(cardId);
    }, 300);
    setRemoving(true);
  };

  return (
    <>
      <Backdrop onClick={discardHandler} />
      {ReactDOM.createPortal(
        <div
          className={[
            classes.container,
            removing ? classes.exit : classes.enter,
          ].join(" ")}
          id="scrollable-container"
        >
          <CardsView
            onPage={false}
            filters={filters}
            cardIndex={cardIndex}
            onConfirm={confirmHandler}
            onDiscard={discardHandler}
          />
        </div>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default CardSelection;
