import classNames from "classnames/bind";
import { plusOneVisible } from "../../../../utils/plusOneVisible";
import HexedCanvas from "../../../svg/HexedCanvas";
import SecretHex from "./SecretHex";
import classes from "./SecretFlower.module.css";
import colors from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const radius = 95;
const delta = 2 * radius;
const centerX = 1.05 * radius;
const centerY = 1.1 * radius;
const hexBase = { width: 8 * radius, height: 2 * centerY, radius };

const SecretFlower = ({
  playerIndex,
  colorId,
  playerSecrets,
  clickHandler,
}) => {
  const reducedSecrets = plusOneVisible(
    playerSecrets,
    (secret) => secret.taken
  );

  const mainClass = cx({
    main: true,
    [colors[colorId]]: true,
  });

  return (
    <div className={mainClass}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.StripesPattern colorId={colorId} />
        {reducedSecrets.map((secret, secretIndex) => (
          <SecretHex
            key={secretIndex}
            playerIndex={playerIndex}
            secret={secret}
            secretIndex={secretIndex}
            onClick={clickHandler}
            center={{ x: centerX + delta * secretIndex, y: centerY }}
            radius={radius}
          />
        ))}
      </HexedCanvas>
    </div>
  );
};

export default SecretFlower;
