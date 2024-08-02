import { initStorage } from "../hooks/useStorage";
import colors from "../data/colors.json";
import factions from "../data/factions.json";

const colorCount = 6;
const defaultPoints = 10;
const pointOptions = [10, 12, 14];
const defaultColor = { colorId: "_default" };
const defaultColors = [...Array(colorCount).keys()].map((_) =>
  structuredClone(defaultColor)
);
const defaultFaction = { factionId: "_unknown" };
const defaultFactions = [...Array(colorCount).keys()].map((_) =>
  structuredClone(defaultFaction)
);

const defaults = {
  points: structuredClone(defaultPoints),
  colors: structuredClone(defaultColors),
  factions: structuredClone(defaultFactions),
};

const validatePosition = (position) => {
  return position >= 0 && position < colorCount;
};

const validateColor = (colorId) => {
  return Object.keys(colors).includes(colorId);
};

const validateFaction = (factionId) => {
  return Object.keys(factions).includes(factionId);
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

  SET_FACTION: (currentState, { position, factionId }) => {
    if (!validatePosition(position)) {
      return { status: "error", message: "Incorrect position" };
    }
    if (!validateFaction(factionId)) {
      return { status: "error", message: "Incorrect faction" };
    }
    const gameSettings = { ...currentState.gameSettings };
    gameSettings.factions[position].factionId = factionId;
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

  RESET_FACTIONS: (currentState, _) => {
    const gameSettings = {
      ...currentState.gameSettings,
      factions: structuredClone(defaultFactions),
    };
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    return { gameSettings: gameSettings };
  },

  RESET_PLAYERS: (currentState, _) => {
    const gameSettings = {
      ...currentState.gameSettings,
      colors: structuredClone(defaultColors),
      factions: structuredClone(defaultFactions),
    };
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    return { gameSettings: gameSettings };
  },
};

const initialState = {
  gameSettings: {
    ...structuredClone(defaults),
    ...(JSON.parse(localStorage.getItem("gameSettings")) ??
      structuredClone(defaults)),
  },
};

export const configureStorage = () => {
  localStorage.setItem(
    "gameSettings",
    JSON.stringify(initialState.gameSettings)
  );
  initStorage(actions, initialState);
};
