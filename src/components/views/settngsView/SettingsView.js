import { createContext, useContext, useState } from "react";
import { useStorage } from "../../../hooks/useStorage";
import FactionPicker from "./FactionPicker";
import FactionView from "../factionsView/FactionsView";
import SettingsMenu from "./SettingsMenu";
import classes from "./SettingsView.module.css";

const SettingsContext = createContext();
export const useSettingsContext = () => useContext(SettingsContext);

const SettingsView = () => {
  const { dispatch } = useStorage();
  const [playerActivated, setPlayerActivated] = useState(-1);

  const setFaction = (factionId) => {
    dispatch("SET_FACTION", { position: playerActivated, factionId });
    setPlayerActivated(-1);
  };
  const context = { playerActivated, setPlayerActivated, setFaction };

  return (
    <SettingsContext.Provider value={context}>
      <div className={classes.main}>
        <FactionPicker className={classes.colorPicker} />
        <FactionView className={classes.factions} />
        <SettingsMenu />
      </div>
    </SettingsContext.Provider>
  );
};

export default SettingsView;
