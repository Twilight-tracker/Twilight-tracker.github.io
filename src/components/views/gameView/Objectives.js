import { useState } from "react";
import { useStorage } from "../../../hooks/useStorage";
import ObjectiveFlower from "../../flowers/ObjectiveFlower";
import CardSelection from "./CardSelection";
import classes from "./Objectives.module.css";

const Objectives = () => {
  const { dispatch } = useStorage();
  const [cardIndex, setCardIndex] = useState(-1);

  const cardSelectedHandler = (cardId) => {
    setCardIndex(() => {
      dispatch("SET_OBJECTIVE", {
        cardIndex,
        cardId,
      });
      return -1;
    });
  };

  return (
    <>
      <div className={classes.main}>
        {[...Array(10).keys()].map((index) => (
          <ObjectiveFlower
            key={index}
            cardIndex={index}
            onSelectCard={(index) => setCardIndex(index)}
          />
        ))}
      </div>
      {cardIndex >= 0 && (
        <CardSelection
          cardIndex={cardIndex}
          onDiscard={() => setCardIndex(-1)}
          onConfirm={cardSelectedHandler}
        />
      )}
    </>
  );
};

export default Objectives;
