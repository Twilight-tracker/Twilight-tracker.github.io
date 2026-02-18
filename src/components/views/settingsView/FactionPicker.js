import { createContext, useContext, useState } from "react";
import { useStorage } from "../../../hooks/useStorage";
import HexGrid from "../../core/HexGrid";
import FactionPickerItem from "./FactionPickerItem";
import HexedCanvas from "../../svg/HexedCanvas";
import classes from "./FactionPicker.module.css";

const WheelContext = createContext();
export const useWheelContext = () => useContext(WheelContext);

const FactionPicker = () => {
  const [colorActivated, setColorActivated] = useState(-1);
  const context = { colorActivated, setColorActivated };

  const { storage, dispatch } = useStorage();
  const { colors: colorHexes, factions } = storage.gameSettings;

  const colorPickHandler = (event) => {
    dispatch("SET_COLOR", {
      position: colorActivated,
      colorId: event.target.id,
    });
    setColorActivated(-1);
    event.preventDefault();
  };

  const coloredBase = { width: 100, height: 60, radius: 10 };

  return (
    <WheelContext.Provider value={context}>
      <div className={classes.main}>
        <HexGrid className={classes.grid}>
          {[...Array(6).keys()].map((index) => (
            <FactionPickerItem
              key={index}
              index={index}
              factionId={factions[index].factionId}
              colorId={colorHexes[index].colorId}
            />
          ))}
        </HexGrid>
        {colorActivated !== -1 && (
          <HexedCanvas className={classes.coloredCanvas} hexBase={coloredBase}>
            <HexedCanvas.ColorHexes
              className={classes.colorHexes}
              onClick={colorPickHandler}
            />
          </HexedCanvas>
        )}
      </div>
    </WheelContext.Provider>
  );
};

export default FactionPicker;
