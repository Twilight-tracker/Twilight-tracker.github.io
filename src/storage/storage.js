import initGameStateStorage from "./gameState";
import initGameSettingsStorage from "./gameSettings";

export const configureStorage = () => {
  initGameStateStorage();
  initGameSettingsStorage();
};
