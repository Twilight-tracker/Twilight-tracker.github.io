import PointCounter from "../../flowers/PointCounter";
import GameMenu from "./GameMenu";
import Objectives from "./Objectives";
import classes from "./GameView.module.css";

const GameView = () => {
  return (
    <div className={classes.main}>
      <div className={classes.leftColumn}>
        <PointCounter />
        <GameMenu />
      </div>
      <Objectives />
    </div>
  );
};

export default GameView;
