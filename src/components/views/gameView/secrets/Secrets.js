import { useState } from "react";
import { useStorage } from "../../../../hooks/useStorage";
import SecretFlower from "./SecretFlower";
import SelectSecretsScreen from "./SelectSecretsScreen";
import CurrentSecretsView from "./CurrentSecretsView";
import PointsTable from "../pointsTable/PointsTable";
import classes from "./Secrets.module.css";

const defaultIndexes = { playerIndex: -1, secretIndex: -1 };

const Secrets = ({ className }) => {
  const { storage, dispatch } = useStorage();
  const secrets = storage.gameState.secrets;
  const colors = storage.gameSettings.colors;

  const [indexes, setIndexes] = useState(defaultIndexes);

  const secretFlowerHandler = (playerIndex, secretIndex) => {
    setIndexes({ playerIndex, secretIndex });
  };

  const secretSelectedHandler = (cardId) => {
    setIndexes(({ playerIndex, secretIndex }) => {
      dispatch("SET_SECRET", {
        playerIndex,
        secretIndex,
        cardId,
      });
      return defaultIndexes;
    });
  };

  return (
    <div className={className}>
      <PointsTable.Header>Секреты</PointsTable.Header>
      <PointsTable.Block>
        {secrets.map((playerSecrets, index) => (
          <SecretFlower
            key={index}
            playerIndex={index}
            colorId={colors[index].colorId}
            playerSecrets={playerSecrets}
            clickHandler={secretFlowerHandler}
          />
        ))}
      </PointsTable.Block>
      {indexes.secretIndex >= 0 && (
        <SelectSecretsScreen
          onDiscard={() => setIndexes(defaultIndexes)}
          onConfirm={secretSelectedHandler}
        />
      )}
      <CurrentSecretsView />
    </div>
  );
};

export default Secrets;
