import { useState } from "react";
import classNames from "classnames";
import LinkButton from "../../ui/LinkButton";
import classes from "./GameMenu.module.css";
import buttons from "../../ui/buttons.module.css";

const GameMenu = ({ className }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleClass = classNames(classes.showMenu, {
    [buttons.blue_active]: showMenu,
    [buttons.blue]: !showMenu,
  });

  return (
    <section className={classNames(className, classes.total)}>
      <div className={toggleClass} onClick={() => setShowMenu((val) => !val)}>
        Меню
      </div>
      {showMenu && (
        <div className={classes.main}>
          <LinkButton to="/newGame">Начать новую игру</LinkButton>
          <LinkButton to="/newGame">Настроить цвета и фракции</LinkButton>
          <LinkButton to="/">Вернуться на главную</LinkButton>
        </div>
      )}
    </section>
  );
};

export default GameMenu;
