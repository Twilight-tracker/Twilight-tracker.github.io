import { useState } from "react";
import { useStorage } from "../../../hooks/useStorage";
import ObjectiveFlower from "../../flowers/ObjectiveFlower";
import SecretFlower from "../../flowers/SecretFlower";
import CardSelection from "./CardSelection";
import classes from "./Objectives.module.css";

const Objectives = () => {
  const dispatch = useStorage()[1];
  const [cardIndex, setCardIndex] = useState(-1);

  const openCardSelectionHandler = (cardIndex) => {
    setCardIndex(cardIndex);
  };

  const discardHandler = () => {
    setCardIndex(-1);
  };

  const cardSelectedHandler = (cardId) => {
    setCardIndex((_) => {
      dispatch("SET_OBJECTIVE", {
        cardIndex: cardIndex,
        cardId: cardId,
      });
      return -1;
    });
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.block}>
          {[...Array(5).keys()].map((index) => (
            <ObjectiveFlower
              key={index}
              cardIndex={index}
              onSelectCard={openCardSelectionHandler}
            />
          ))}
        </div>
        <div className={classes.block}>
          {[...Array(5).keys()].map((index) => (
            <ObjectiveFlower
              key={index + 5}
              cardIndex={index + 5}
              onSelectCard={openCardSelectionHandler}
            />
          ))}
        </div>
        <div className={classes.block}>
          {[...Array(6).keys()].map((index) => (
            <SecretFlower
              key={index}
              playerIndex={index}
            />
          ))}
        </div>
      </div>
      {cardIndex >= 0 && (
        <CardSelection
          cardIndex={cardIndex}
          onDiscard={discardHandler}
          onConfirm={cardSelectedHandler}
        />
      )}
    </>
  );
};

export default Objectives;
