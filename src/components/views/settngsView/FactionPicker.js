import { createContext, useContext, useState } from "react";
import classNames from "classnames/bind";
import { useStorage } from "../../../hooks/useStorage";
import { useSettingsContext } from "./SettingsView";
import HexedCanvas from "../../svg/HexedCanvas";
import { factionsAssets } from "../../../assets/factions";
import colors from "../../../data/colors.json";
import classes from "./FactionPicker.module.css";
import colorClasses from "../../../data/colors.module.css";

const cx = classNames.bind(classes);

const WheelContext = createContext();
export const useWheelContext = () => useContext(WheelContext);

const FactionPicker = () => {
  const [colorActivated, setColorActivated] = useState(-1);
  const context = { colorActivated, setColorActivated };

  const { storage, dispatch } = useStorage();
  const { colors: colorHexes, factions } = storage.gameSettings;
  const { playerActivated, setPlayerActivated } = useSettingsContext();

  const imageClass = (index) =>
    cx({ image: true, active: index === playerActivated });

  const canvasClass = (index) =>
    cx({ canvas: true, colorActive: index === colorActivated });

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

  const colorPickHandler = (event) => {
    dispatch("SET_COLOR", {
      position: colorActivated,
      colorId: event.target.id,
    });
    setColorActivated(-1);
    event.preventDefault();
  };

  const hexBase = { width: 52, height: 60, radius: 20 };
  const coloredBase = { width: 52, height: 60, radius: 10 };

  return (
    <WheelContext.Provider value={context}>
      <div className={classes.main}>
        <div className={classes.grid}>
          {[...Array(6).keys()].map((index) => {
            const factionId = factions[index].factionId;
            const colorId = colorHexes[index].colorId;
            const hexClass = cx({ hex: true, [colorClasses[colorId]]: true });
            return (
              <div className={classes.container} key={index}>
                <img
                  className={imageClass(index)}
                  id={index}
                  {...factionsAssets[factionId]}
                  onClick={clickHandler}
                />
                <HexedCanvas className={canvasClass(index)} hexBase={hexBase}>
                  <HexedCanvas.Hex
                    id={index}
                    className={hexClass}
                    stroke={index === colorActivated ? "red" : "whitesmoke"}
                    onClick={colorActivateHandler}
                  />
                </HexedCanvas>
              </div>
            );
          })}
        </div>
        {colorActivated !== -1 && (
          <HexedCanvas className={classes.coloredCanvas} hexBase={coloredBase}>
            <HexedCanvas.ColorHexes
              className={classes.colorHexes}
              playerIndex={3}
              onClick={colorPickHandler}
            />
          </HexedCanvas>
        )}
      </div>
    </WheelContext.Provider>
  );
};

export default FactionPicker;
