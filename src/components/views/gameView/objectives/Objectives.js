import { useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import { plusOneVisible } from "../../../../utils/plusOneVisible";
import ObjectiveFlower from "./ObjectiveFlower";
import CardSelection from "../CardSelection";
import classes from "./Objectives.module.css";

const cx = classNames.bind(classes);

const Objectives = ({ className }) => {
  const { storage, dispatch } = useStorage();
  const objectives = storage.gameState.objectives;
  const data = plusOneVisible(objectives, (objective) => objective.cardId);

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

  const filters =
    cardIndex >= 5
      ? { stage1: false, stage2: true, secret: false }
      : { stage1: true, stage2: false, secret: false };

  const mainClass = cx({
    [className]: true,
    main: true,
    showThree: data.length <= 4,
    showFive: data.length > 4 && data.length <= 6,
    showAll: data.length > 6
  });
  return (
    <>
      <div className={mainClass}>
        {data.map((_, index) => (
          <ObjectiveFlower
            key={index}
            cardIndex={index}
            onSelectCard={(index) => setCardIndex(index)}
          />
        ))}
      </div>
      {cardIndex >= 0 && (
        <CardSelection
          filters={filters}
          onDiscard={() => setCardIndex(-1)}
          onConfirm={cardSelectedHandler}
        />
      )}
    </>
  );
};

export default Objectives;
