import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import SupporterHex from "./SupporterHex";
import ReceivedHex from "./ReceivedHex";
import classes from "./ThroneFlower.module.css";
import colors from "../../../../data/colors.module.css";
import { useStorage } from "../../../../hooks/useStorage";

const cx = classNames.bind(classes);

const radius = 95;
const supporterCenter = { x: 100, y: 110 };
const leafCenter = { x: 150, y: 110 };

const centerX = 470;
const centerY = 110;
const delta = 120;

const hexBase = { width: 1070, height: 220, radius };

const ThroneFlower = ({
  supporterIndex,
  colorId,
  selectedSupporter,
  onSelectSupporter,
  onSelectReceiver,
}) => {
  const { storage } = useStorage();
  const throneSupports = storage.gameState.throneSupports;
  const supporters = throneSupports.reduce(
    (acc, item, index) => (item === supporterIndex ? [...acc, index] : acc),
    []
  );

  const mainClass = cx({
    main: true,
    [colors[colorId]]: true,
  });

  return (
    <div className={mainClass}>
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.StripesPattern colorId={colorId} />
        <SupporterHex
          id={supporterIndex}
          supporterIndex={supporterIndex}
          center={supporterCenter}
          selectedSupporter={selectedSupporter}
          onClick={onSelectSupporter}
        />
        {selectedSupporter > -1 && selectedSupporter !== supporterIndex && (
          <HexedCanvas.Leaf
            className={classes.leaf}
            id={supporterIndex}
            center={leafCenter}
            radius={100}
            onClick={onSelectReceiver}
          />
        )}
        {supporters.map((supporter, index) => (
          <ReceivedHex
            key={index}
            supporterIndex={supporter}
            center={{ x: centerX + index * delta, y: centerY }}
            radius={radius}
          />
        ))}
      </HexedCanvas>
    </div>
  );
};

export default ThroneFlower;
