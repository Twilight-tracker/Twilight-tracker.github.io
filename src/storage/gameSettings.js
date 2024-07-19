import { initStorage } from "../hooks/useStorage";
import colors from "../data/colors.json";

const colorCount = 6;
const defaultPoints = 10;
const pointOptions = [10, 12, 14];
const defaultColor = { colorId: "_default" };
const defaultColors = [...Array(colorCount).keys()].map((_) => defaultColor);

const defaults = {
  points: defaultPoints,
  colors: defaultColors,
};

const validatePosition = (position) => {
  return position >= 0 && position < colorCount;
};

const validateColor = (colorId) => {
  return Object.keys(colors).includes(colorId);
};

const validatePoints = (points) => {
  return pointOptions.includes(points);
};

export const actions = {
  SET_COLOR: (currentState, { position, colorId }) => {
    if (!validatePosition(position)) {
      return { status: "error", message: "Incorrect position" };
    }
    if (!validateColor(colorId)) {
      return { status: "error", message: "Incorrect color" };
    }
    const gameSettings = { ...currentState.gameSettings };
    gameSettings.colors[position].colorId = colorId;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    return { gameSettings: gameSettings };
  },

  SET_POINTS: (currentState, { points }) => {
    if (!validatePoints(points)) {
      return { status: "error", message: "Incorrect points" };
    }
    const gameSettings = { ...currentState.gameSettings, points: points };
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    return { gameSettings: gameSettings };
  },

  RESET_COLORS: (currentState, _) => {
    const gameSettings = {
      ...currentState.gameSettings,
      colors: structuredClone(defaultColors),
    };
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    return { gameSettings: gameSettings };
  },
};

const initialState = {
  gameSettings: JSON.parse(localStorage.getItem("gameSettings")) ?? structuredClone(defaults),
};

export const configureStorage = () => {
  localStorage.setItem("gameSettings", JSON.stringify(initialState.gameSettings));
  initStorage(actions, initialState);
};
