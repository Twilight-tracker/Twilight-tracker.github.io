import { useStorage } from "../../../../hooks/useStorage";
import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import classes from "./SupporterHex.module.css";

const cx = classNames.bind(classes);

const SupporterHex = ({
  supporterIndex,
  onClick,
  selectedSupporter,
  center,
  radius,
}) => {
  const { storage, dispatch } = useStorage();
  const receiverIndex = storage.gameState.throneSupports[supporterIndex];
  const supported = receiverIndex > -1;
  const selected = selectedSupporter === supporterIndex;
  const anotherSelected = !selected && selectedSupporter > -1;

  const clickHandler = supported
    ? () => dispatch("RESET_THRONE_SUPPORT", { supporterIndex })
    : () => onClick(supporterIndex);

  const hexClass = cx({
    hex: true,
    hexNotSupported: !supported,
    hexSupported: supported,
    hexSelected: !supported && selected,
    hexAnotherSelected: anotherSelected
  });

  const plusClass = cx({
    plusSelected: selected,
    plusNotSelected: !selected,
    plusAnotherSelected: anotherSelected
  })

  return (
    <g>
      <HexedCanvas.Hex
        className={classes.mount}
        center={center}
        radius={radius}
        sitOnEdge={false}
      />
      <HexedCanvas.Hex
        className={hexClass}
        center={center}
        radius={radius}
        sitOnEdge={false}
        onClick={clickHandler}
      />
      {!supported && (
        <HexedCanvas.Plus
          className={plusClass}
          center={center}
          radius={radius}
        />
      )}
    </g>
  );
};

export default SupporterHex;
