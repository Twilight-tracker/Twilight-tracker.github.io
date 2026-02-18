import { useState } from "react";
import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import { hexWithoutPetals } from "../../../svg/constants";
import CurrentSecretsScreen from "./CurrentSecretsScreen";
import classes from "./CurrentSecretsView.module.css";

const cx = classNames.bind(classes);

const CurrentSecretsView = () => {
  const [showSecretsScreen, setShowSecretsScreen] = useState(false);

  const showSecretsHandler = () => setShowSecretsScreen(true);
  const discardHandler = () => setShowSecretsScreen(false);

  const hexClass = cx({
    hex: true,
    active: showSecretsScreen,
    inactive: !showSecretsScreen,
  });

  return (
    <>
      <HexedCanvas className={classes.canvas} hexBase={hexWithoutPetals}>
        <HexedCanvas.Hex className={hexClass} onClick={showSecretsHandler} />
        <HexedCanvas.Eye className={classes.icon} />
      </HexedCanvas>
      {showSecretsScreen && <CurrentSecretsScreen onDiscard={discardHandler} />}
    </>
  );
};

export default CurrentSecretsView;
