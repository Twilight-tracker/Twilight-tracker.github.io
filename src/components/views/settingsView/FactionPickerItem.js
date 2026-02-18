import classNames from "classnames/bind";
import { useSettingsContext } from "./SettingsView";
import { useWheelContext } from "./FactionPicker";
import HexedCanvas from "../../svg/HexedCanvas";
import HexGrid from "../../core/HexGrid";
import { factionsAssets } from "../../../assets/factions";
import classes from "./FactionPickerItem.module.css";
import colors from "../../../data/colors.module.css";

const cx = classNames.bind(classes);

const FactionPickerItem = ({ index, factionId, colorId }) => {
  const { colorActivated, setColorActivated } = useWheelContext();
  const { playerActivated, setPlayerActivated } = useSettingsContext();

  const { portrait, icon } = factionsAssets[factionId];
  const { src: portraitSrc, alt: portraitAlt } = portrait;
  const { src: iconSrc, alt: iconAlt } = icon;

  const portraitClass = cx({
    portrait: true,
    active: index === playerActivated,
  });

  const iconClass = cx({
    icon: true,
    active: index === playerActivated,
  });

  const canvasClass = cx({
    canvas: true,
    colorActive: index === colorActivated,
  });

  const clickHandler = (event) => {
    const newValue = Number(event.target.id);
    setPlayerActivated((value) => (value === newValue ? -1 : newValue), []);
    event.preventDefault();
  };

  const colorActivateHandler = (event) => {
    const newValue = Number(event.target.id);
    setColorActivated((value) => (value === newValue ? -1 : newValue), []);
    event.preventDefault();
  };

  const hexBase = { width: 52, height: 60, radius: 20 };
  const hexClass = cx({
    hex: true,
    [colors[colorId]]: true,
    activeHex: index === colorActivated,
    inactiveHex: index !== colorActivated,
  });

  return (
    <HexGrid.Item>
      <img
        className={portraitClass}
        id={index}
        src={portraitSrc}
        alt={portraitAlt}
        onClick={clickHandler}
      />
      <img
        className={iconClass}
        id={index}
        src={iconSrc}
        alt={iconAlt}
        onClick={clickHandler}
      />
      <HexedCanvas className={canvasClass} hexBase={hexBase}>
        <HexedCanvas.Hex
          id={index}
          className={hexClass}
          onClick={colorActivateHandler}
        />
      </HexedCanvas>
    </HexGrid.Item>
  );
};

export default FactionPickerItem;
