import classNames from "classnames/bind";
import HexedCanvas from "../../../svg/HexedCanvas";
import HexGrid from "../../../Layout/HexGrid";
import { factionsAssets } from "../../../../assets/factions";
import classes from "./PointCounterItem.module.css";
import colors from "../../../../data/colors.module.css";

const cx = classNames.bind(classes);

const PointCounterItem = ({ colorId, factionId, points }) => {
  const { portrait, icon } = factionsAssets[factionId];
  const { src: portraitSrc, alt: portraitAlt } = portrait;
  const { src: iconSrc, alt: iconAlt } = icon;

  const hexBase = { width: 70, height: 52, radius: 19 };
  const iconCenter = {x: 20, y: 17.32};
  const pointsCenter = {x: 50, y: 34.64};

  const itemClass = cx({
    [colors[colorId]]: true,
  });

  return (
    <HexGrid.Item className={itemClass}>
      <img className={classes.portrait} src={portraitSrc} alt={portraitAlt} />
      <HexedCanvas className={classes.canvas} hexBase={hexBase}>
        <HexedCanvas.Hex className={classes.iconHex} center={iconCenter} />
        <HexedCanvas.Hex className={classes.pointsHex} center={pointsCenter} />
      </HexedCanvas>
      <img className={classes.icon} src={iconSrc} alt={iconAlt} />
      <div className={classes.points}>{points}</div>
    </HexGrid.Item>
  );
};

export default PointCounterItem;
