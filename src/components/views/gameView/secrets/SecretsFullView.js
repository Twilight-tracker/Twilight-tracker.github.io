import { useState } from "react";
import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import { hexWithoutPetals } from "../../../svg/constants";
import Overlay from "../../../ui/Overlay";
import SecretsTable from "./SecretsTable";
import ScrollToTop from "../../../Layout/ScrollToTop";
import classes from "./SecretsFullView.module.css";

const cx = classNames.bind(classes);

const SecretsFullView = () => {
  const [showSecrets, setShowSecrets] = useState(false);

  const showSecretsHandler = () => setShowSecrets(true);
  const discardHandler = () => setShowSecrets(false);

  const hexClass = cx({
    hex: true,
    active: showSecrets,
    inactive: !showSecrets,
  });

  return (
    <>
      <HexedCanvas className={classes.canvas} hexBase={hexWithoutPetals}>
        <HexedCanvas.Hex
          className={hexClass}
          onClick={showSecretsHandler}
        />
        <HexedCanvas.Secret className={classes.icon} />
      </HexedCanvas>
      {showSecrets && (
        <Overlay
          className={classes.container}
          containerId="secrets"
          onDiscard={discardHandler}
          onConfirm={discardHandler}
        >
          <SecretsTable className={classes.table} />
          <ScrollToTop containerId="secrets" />
        </Overlay>
      )}
    </>
  );
};

export default SecretsFullView;
