import { useStorage } from "../../../hooks/useStorage";
import LinkButton from "../../ui/LinkButton";
import classes from "./SettingsMenu.module.css";

const SettingsMenu = () => {
  const { dispatch } = useStorage(false);
  const resetHandler = () => {
    dispatch("RESET_STATE", {});
  };

  return (
    <div className={classes.buttons}>
      <LinkButton to="/game">Продолжить игру</LinkButton>
      <LinkButton to="/game" onClick={resetHandler}>
        Начать новую игру
      </LinkButton>
      <LinkButton to="/">Назад</LinkButton>
    </div>
  );
};

export default SettingsMenu;
