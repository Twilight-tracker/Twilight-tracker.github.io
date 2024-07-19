import InactiveFlower from "./InactiveFlower";
import ActiveFlower from "./ActiveFlower";
import { useStorage } from "../../hooks/useStorage";

const ObjectiveFlower = ({ cardIndex, onSelectCard }) => {
  const storage = useStorage()[0];
  const cardId = storage.gameState.objectives[cardIndex].cardId;
  return (
    <>
      {cardId && <ActiveFlower cardIndex={cardIndex} />}
      {!cardId && <InactiveFlower cardIndex={cardIndex} onSelectCard={onSelectCard} />}
    </>
  );
};

export default ObjectiveFlower;
