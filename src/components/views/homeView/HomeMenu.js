import LinkButton from "../../ui/LinkButton";
import classes from "./HomeMenu.module.css";
import buttons from "../../ui/buttons.module.css";

const HomeMenu = () => {
  return (
    <div className={classes.total}>
      <div className={classes.main}>
        <h1>Трекер Сумерек</h1>
        <LinkButton to="/game" className={buttons.green}>
          Продолжить игру
        </LinkButton>
        <LinkButton to="/newGame">Новая игра</LinkButton>
        <LinkButton to="/objectives">Карты целей</LinkButton>
        <div className={classes.warning}>
          Сайт работает в&nbsp;тестовом режиме и&nbsp;предназначен
          для&nbsp;персонального использования администратором игровой сессии.
        </div>
        <div className={classes.redWarning}>
          Никому не&nbsp;передавайте ссылку на&nbsp;этот сайт!
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;
