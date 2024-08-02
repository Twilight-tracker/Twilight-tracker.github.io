import { createContext, useContext, useState } from "react";
import GameMenu from "./GameMenu";
import FactionPointCounter from "./FactionPointCounter";
import MagnifierButton from "./MagnifierButton";
import GameTable from "./gameTab/GameTable";
import classes from "./GameView.module.css";

const GameViewContext = createContext();

export const useGameViewContext = () => {
  return useContext(GameViewContext);
};

const GameView = () => {
  const [magnifierActive, setMagnifierActive] = useState(false);
  const context = { magnifierActive, setMagnifierActive };
  return (
    <GameViewContext.Provider value={context}>
      <div className={classes.main}>
        <MagnifierButton className={classes.magnifier} />
        <FactionPointCounter className={classes.pointCounter} />
        <GameMenu className={classes.menu} />
        <GameTable />
      </div>
    </GameViewContext.Provider>
  );
};

export default GameView;
