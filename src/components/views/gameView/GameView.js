import { createContext, useContext, useState } from "react";
import GameMenu from "./GameMenu";
import Objectives from "./Objectives";
import FactionPointCounter from "./FactionPointCounter";
import MagnifierButton from "./MagnifierButton";
import Secrets from "./Secrets";
import classes from "./GameView.module.css";

const GameViewContext = createContext();
export const useGameViewContext = () => useContext(GameViewContext);

const GameView = () => {
  const [magnifierActive, setMagnifierActive] = useState(false);
  const context = { magnifierActive, setMagnifierActive };
  return (
    <GameViewContext.Provider value={context}>
      <div className={classes.main}>
        <GameMenu className={classes.menu} />
        <MagnifierButton className={classes.magnifier} />
        <FactionPointCounter className={classes.pointCounter} />
        <Objectives className={classes.objectives} />
        <Secrets className={classes.secrets} />
      </div>
    </GameViewContext.Provider>
  );
};

export default GameView;
