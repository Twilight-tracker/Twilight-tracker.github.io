import { useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../../hooks/useStorage";
import SecretFlower from "../../flowers/SecretFlower";
import ExtraPoints from "./ExtraPoints";
import CardSelection from "./CardSelection";
import HexedCanvas from "../../svg/HexedCanvas";
import { hexWithoutPetals } from "../../svg/constants";
import classes from "./Secrets.module.css";
import SecretsFullView from "./SecretsFullView";

const defaultIndexes = { playerIndex: -1, secretIndex: -1 };
const cx = classNames.bind(classes);

const Secrets = ({ className }) => {
  const { storage, dispatch } = useStorage();
  const secrets = storage.gameState.secrets;
  const colors = storage.gameSettings.colors;

  const [indexes, setIndexes] = useState(defaultIndexes);
  const [showSecrets, setShowSecrets] = useState(false);

  const showSecretsHandler = () => setShowSecrets(false);

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

  const hexClass = cx({
    hex: true,
    active: showSecrets,
    inactive: !showSecrets,
  });

  return (
    <div className={className}>
      <ExtraPoints className={classes.extraPoints} />
      <div className={classes.main}>
        {secrets.map((playerSecrets, index) => (
          <SecretFlower
            key={index}
            playerIndex={index}
            colorId={colors[index].colorId}
            playerSecrets={playerSecrets}
            clickHandler={secretFlowerHandler}
          />
        ))}
      </div>
      {indexes.secretIndex >= 0 && (
        <CardSelection
          filters={{ stage1: false, stage2: false, secret: true }}
          onDiscard={() => setIndexes(defaultIndexes)}
          onConfirm={secretSelectedHandler}
        />
      )}
      <HexedCanvas className={classes.canvas} hexBase={hexWithoutPetals}>
        <HexedCanvas.Hex
          className={hexClass}
          onClick={() => setShowSecrets(true)}
        />
        <HexedCanvas.Secret className={classes.icon} />
      </HexedCanvas>
      {showSecrets && (
        <SecretsFullView onDiscard={showSecretsHandler} />
      )}
    </div>
  );
};

export default Secrets;
