import classNames from "classnames/bind";
import { useStorage } from "../../../../hooks/useStorage";
import HexedCanvas from "../../../svg/HexedCanvas";
import HexGrid from "../../../core/HexGrid";
import { factionsAssets } from "../../../../assets/factions";
import factions from "../../../../data/factions.json";
import classes from "./PointCounterItem.module.css";
import colors from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const PointCounterItem = ({ colorId, position, factionId, points }) => {
  const { dispatch } = useStorage();

  const { portrait, icon } = factionsAssets[factionId];
  const { src: portraitSrc, alt: portraitAlt } = portrait;
  const { src: iconSrc, alt: iconAlt } = icon;

  const hexBase = { width: 70, height: 52, radius: 19 };
  const iconCenter = { x: 20, y: 17.32 };
  const pointsCenter = { x: 50, y: 34.64 };

  const isSwitchable = factions[factionId].switchTo;
  const switchHandler = isSwitchable
    ? () => dispatch("SWITCH_FACTION", { position })
    : () => {};

  const itemClass = cx({
    [colors[colorId]]: true,
  });

  const iconHexClass = cx({
    iconHex: true,
    hoverableIconHex: isSwitchable
  });

  return (
    <HexGrid.Item className={itemClass}>
      <img className={classes.portrait} src={portraitSrc} alt={portraitAlt} />
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Hex
          className={iconHexClass}
          center={iconCenter}
          onClick={switchHandler}
        />
        <HexedCanvas.Hex className={classes.pointsHex} center={pointsCenter} />
      </HexedCanvas>
      <img className={classes.icon} src={iconSrc} alt={iconAlt} />
      <div className={classes.points}>{points}</div>
    </HexGrid.Item>
  );
};

export default PointCounterItem;
