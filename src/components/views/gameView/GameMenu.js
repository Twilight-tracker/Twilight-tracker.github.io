import { useState } from "react";
import LinkButton from "../../ui/LinkButton";
import classes from "./GameMenu.module.css";
import buttons from "../../ui/buttons.module.css";

const GameMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleShowMenu = () => {
    setShowMenu((value) => !value);
  };

  return (
    <section className={classes.total}>
      {showMenu && (
        <div className={classes.main}>
          <LinkButton to="/newGame">Начать новую игру</LinkButton>
          <LinkButton to="/newGame">Настроить цвета и фракции</LinkButton>
          <LinkButton to="/">Вернуться на главную</LinkButton>
        </div>
      )}
      <div
        className={[
          classes.showMenu,
          showMenu ? buttons.blue_active : buttons.blue,
        ].join(" ")}
        onClick={toggleShowMenu}
      >
        Меню
      </div>
    </section>
  );
};

export default GameMenu;
