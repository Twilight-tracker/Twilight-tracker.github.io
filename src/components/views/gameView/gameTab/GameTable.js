import { useState } from "react";
import classNames from "classnames/bind";
import GameTab from "./GameTab";
import Objectives from "../Objectives";
import ExtraPoints from "../ExtraPoints";
import classes from "./GameTable.module.css";

const cx = classNames.bind(classes);
const data = {
  objectives: {
    label: "Основные цели",
    children: <Objectives />,
  },
  secrets: {
    label: "Секретные цели",
    children: <ExtraPoints />,
  },
};

const GameTable = () => {
  const [activeTab, setActiveTab] = useState("objectives");

  const clickHandler = (event) => {
    const id = event.target.id;
    if (id === activeTab) return;
    setActiveTab(id);
  };

  const buttonClass = (id) =>
    cx({
      button: true,
      active: id === activeTab,
      inactive: id !== activeTab,
    });

  return (
    <div className={classes.main}>
      <div className={classes.buttons}>
        {Object.entries(data).map(([key, { label }]) => (
          <div
            key={key}
            id={key}
            className={buttonClass(key)}
            onClick={clickHandler}
          >
            <div className={classes.label}>{label}</div>
          </div>
        ))}
      </div>
      <div className={classes.tab}>
        {Object.entries(data)
          .filter(([key, _]) => key === activeTab)
          .map(([key, { children }]) => (
            <GameTab key={key} id={key} className={classes.tab}>
              {children}
            </GameTab>
          ))}
      </div>
    </div>
  );
};

export default GameTable;
