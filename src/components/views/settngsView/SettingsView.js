import { useStorage } from "../../../hooks/useStorage";
import ColorPicker from "./ColorPicker";
import LinkButton from "../../ui/LinkButton";
import classes from "./SettingsView.module.css";

const SettingsView = () => {
  const [_, dispatch] = useStorage();
  const resetHandler = () => {
    dispatch("RESET_STATE", {});
  };

  return (
    <section className={classes.main}>
      <h1 className={classes.title}>Выберите цвета игроков</h1>
      <ColorPicker />
      <div className={classes.fractions}>
        <div className={classes.label}>
          Выбор фракций <span className={classes.italic}>Скоро!</span>
        </div>
      </div>
      <div className={classes.buttons}>
        <LinkButton to="/game">Продолжить игру</LinkButton>
        <LinkButton to="/game" onClick={resetHandler}>
          Начать новую игру
        </LinkButton>
        <LinkButton to="/">Назад</LinkButton>
      </div>
    </section>
  );
};

export default SettingsView;
