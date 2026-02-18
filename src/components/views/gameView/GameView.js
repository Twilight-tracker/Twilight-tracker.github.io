import { createContext, useContext, useState } from "react";
import GameMenu from "./ui/GameMenu";
import MagnifierButton from "./ui/MagnifierButton";
import PointCounter from "./pointCounter/PointCounter";
import PointsTable from "./pointsTable/PointsTable";
import Mecatol from "./mecatol/Mecatol";
import Gains from "./gains/Gains";
import Objectives from "./objectives/Objectives";
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
        <PointCounter className={classes.pointCounter} />
        <PointsTable className={classes.pointsTable} />
        <Mecatol className={classes.mecatol} />
        <Gains className={classes.gains} />
        <Objectives className={classes.objectives} />
      </div>
    </GameViewContext.Provider>
  );
};

export default GameView;
