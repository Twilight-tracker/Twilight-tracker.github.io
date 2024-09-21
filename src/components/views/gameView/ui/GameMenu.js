import { useState } from "react";
import classNames from "classnames/bind";
import Overlay from "../../../ui/Overlay";
import LinkButton from "../../../ui/LinkButton";
import HexedCanvas from "../../../svg/HexedCanvas";
import { hexWithoutPetals } from "../../../svg/constants";
import classes from "./GameMenu.module.css";
import buttons from "../../../ui/buttons.module.css";

const cx = classNames.bind(classes);

const GameMenu = ({ className }) => {
  const [showMenu, setShowMenu] = useState(false);
  const confirmHandler = () => setShowMenu(false);

  const totalClass = cx([className], { total: true });
  const greenButtonClass = cx({ button: true, [buttons.green]: true });
  const hexClass = cx({
    hex: true,
    active: showMenu,
    inactive: !showMenu,
  });

  return (
    <div className={totalClass}>
      <HexedCanvas className={classes.canvas} hexBase={hexWithoutPetals}>
        <HexedCanvas.Hex
          className={hexClass}
          onClick={() => setShowMenu(true)}
        />
        <HexedCanvas.Burger className={classes.burger} />
      </HexedCanvas>
      {showMenu && (
        <Overlay
          className={classes.overlay}
          containerId="menu"
          onDiscard={confirmHandler}
          onConfirm={confirmHandler}
        >
          <div className={classes.main}>
            <LinkButton to="/newGame">Начать новую игру</LinkButton>
            <LinkButton to="/newGame">Настроить цвета и фракции</LinkButton>
            <LinkButton to="/">Вернуться на главную</LinkButton>
            <div className={greenButtonClass} onClick={confirmHandler}>
              Назад
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default GameMenu;
