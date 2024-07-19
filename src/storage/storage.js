import { configureStorage as initGameStateStorage } from "./gameState";
import { configureStorage as initGameSettingsStorage } from "./gameSettings";

export const configureStorage = () => {
  initGameStateStorage();
  initGameSettingsStorage();
};
