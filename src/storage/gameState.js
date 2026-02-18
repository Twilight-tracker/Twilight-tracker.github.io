import { initStorage } from "../hooks/useStorage";
import gains from "../data/gains.json";
import relics from "../data/relics.json";
import agendas from "../data/agendas.json";

const GAIN_RESETED = -1;
const RELIC_RESETED = -1;
const AGENDA_RESETED = -2;

const objectiveCount = 10;
const playerCount = 6;
const secretCount = 4;

const defaultPoints = [...Array(playerCount).keys()].map((_) => false);
const defaultObjective = { cardId: undefined, points: defaultPoints, date: -1 };
const defaultExtraPoints = [...Array(playerCount).keys()].map((_) => 0);
const defaultMecatolPoints = [...Array(playerCount).keys()].map((_) => 0);
const defaultSecret = {
  taken: false,
  cardId: undefined,
};
const defaultPlayerSecrets = [...Array(secretCount).keys()].map((_) =>
  structuredClone(defaultSecret),
);
const defaultSecrets = [...Array(playerCount).keys()].map((_) =>
  structuredClone(defaultPlayerSecrets),
);
const defaultThroneSupports = [...Array(playerCount).keys()].map((_) => -1);

const defaultGains = Object.fromEntries(
  Object.values(gains)
    .filter(({ value }) => value)
    .map(({ id }) => [id, GAIN_RESETED]),
);

const defaultRelic = {
  playerIndex: RELIC_RESETED,
  purged: false,
  pointTaken: false,
};
const defaultRelics = Object.fromEntries(
  Object.keys(relics).map((id) => [id, structuredClone(defaultRelic)]),
);
const defaultAgendas = Object.fromEntries(
  Object.keys(agendas).map((id) => [id, AGENDA_RESETED]),
);

const defaults = {
  objectives: [...Array(objectiveCount).keys()].map((_) =>
    structuredClone(defaultObjective),
  ),
  secrets: structuredClone(defaultSecrets),
  extraPoints: structuredClone(defaultExtraPoints),
  mecatolPoints: structuredClone(defaultMecatolPoints),
  throneSupports: [...defaultThroneSupports],
  gains: { ...defaultGains },
  relics: structuredClone(defaultRelics),
  agendas: { ...defaultAgendas },
};

const validateCardIndex = (cardIndex) =>
  cardIndex >= 0 && cardIndex < objectiveCount;
const validatePlayerIndex = (playerIndex) =>
  playerIndex >= 0 && playerIndex < playerCount;
const validateSecretIndex = (secretIndex) =>
  secretIndex >= 0 && secretIndex < secretCount;

const validateGain = (gainId) => Object.keys(gains).includes(gainId);
const validateRelic = (relicId) => Object.keys(relics).includes(relicId);

export const actions = {

  // OBJECTIVES

  SET_OBJECTIVE: (currentState, { cardIndex, cardId }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", meassage: "Incorrect cardIndex" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex] = {
      ...gameState.objectives[cardIndex],
      cardId,
      date: Date.now(),
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  TOGGLE_OBJECTIVE_POINTS: (currentState, { cardIndex, playerIndex }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", message: "Incorrect card index" };
    }
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    const points = gameState.objectives[cardIndex].points;
    points[playerIndex] = !points[playerIndex];
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_OBJECTIVE: (currentState, { cardIndex }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", message: "Incorrect card index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex] = structuredClone(defaultObjective);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_OBJECTIVE_POINTS: (currentState, { cardIndex }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", message: "Incorrect card index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex].points = [...defaultPoints];
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // SECRETS

  SET_SECRET_TAKEN: (currentState, { playerIndex, secretIndex }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    if (!validateSecretIndex(secretIndex)) {
      return { status: "error", message: "Incorrect secret index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex][secretIndex].taken = true;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  SET_SECRET: (currentState, { playerIndex, secretIndex, cardId }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    if (!validateSecretIndex(secretIndex)) {
      return { status: "error", message: "Incorrect secret index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex][secretIndex].cardId = cardId;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_SECRET: (currentState, { playerIndex, secretIndex }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    if (!validateSecretIndex(secretIndex)) {
      return { status: "error", message: "Incorrect secret index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex][secretIndex] =
      structuredClone(defaultSecret);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_PLAYER_SECRETS: (currentState, { playerIndex }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex] = structuredClone(defaultPlayerSecrets);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_SECRETS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      secrets: structuredClone(defaultSecrets),
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // EXTRA POINTS

  SET_EXTRA_POINTS: (currentState, { playerIndex, value }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.extraPoints[playerIndex] = value;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_EXTRA_POINTS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      extraPoints: [...defaultExtraPoints],
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // MECATOL POINTS

  SET_MECATOL_POINTS: (currentState, { playerIndex, value }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.mecatolPoints[playerIndex] = value;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_MECATOL_POINTS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      mecatolPoints: [...defaultMecatolPoints],
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // GAINS

  SET_GAIN: (currentState, { gainId, playerIndex }) => {
    if (!validateGain(gainId)) {
      return { status: "error", message: "Incorrect gain id" };
    }
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.gains[gainId] = playerIndex;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_GAIN: (currentState, { gainId }) => {
    if (!validateGain(gainId)) {
      return { status: "error", message: "Incorrect gain id" };
    }
    const gameState = { ...currentState.gameState };
    gameState.gains[gainId] = -1;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_GAINS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      gains: { ...defaultGains },
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // RELICS

  SET_RELIC_TAKEN: (currentState, { relicId, playerIndex }) => {
    if (!validateRelic(relicId)) {
      return { status: "error", message: "Incorrect relic id" };
    }
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.relics[relicId].playerIndex = playerIndex;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_RELIC_TAKEN: (currentState, { relicId }) => {
    if (!validateRelic(relicId)) {
      return { status: "error", message: "Incorrect relic id" };
    }
    const gameState = { ...currentState.gameState };
    gameState.relics[relicId].playerIndex = RELIC_RESETED;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  SWITCH_RELIC_POINT_TAKEN: (currentState, { relicId }) => {
    if (!validateRelic(relicId)) {
      return { status: "error", message: "Incorrect relic id" };
    }
    const gameState = { ...currentState.gameState };
    gameState.relics[relicId].pointTaken =
      !gameState.relics[relicId].pointTaken;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  SWITCH_RELIC_PURGED: (currentState, { relicId }) => {
    if (!validateRelic(relicId)) {
      return { status: "error", message: "Incorrect relic id" };
    }
    const gameState = { ...currentState.gameState };
    gameState.relics[relicId].purged = !gameState.relics[relicId].purged;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_RELIC: (currentState, { relicId }) => {
    if (!validateRelic(relicId)) {
      return { status: "error", message: "Incorrect relic id" };
    }
    const gameState = { ...currentState.gameState };
    gameState.relics[relicId] = structuredClone(defaultRelic);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_RELICS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      relics: structuredClone(defaultRelics),
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // THRONE SUPPORT

  SET_THRONE_SUPPORT: (currentState, { supporterIndex, receiverIndex }) => {
    if (!validatePlayerIndex(supporterIndex)) {
      return { status: "error", message: "Incorrect supporter player index" };
    }
    if (!validatePlayerIndex(receiverIndex)) {
      return { status: "error", message: "Incorrect receiver player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.throneSupports[supporterIndex] = receiverIndex;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_THRONE_SUPPORT: (currentState, { supporterIndex }) => {
    if (!validatePlayerIndex(supporterIndex)) {
      return { status: "error", message: "Incorrect supporter player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.throneSupports[supporterIndex] = -1;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  RESET_THRONE_SUPPORTS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      throneSupports: [...defaultThroneSupports],
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState };
  },

  // OVERALL

  RESET_STATE: (_1, _2) => {
    localStorage.setItem("gameState", JSON.stringify(defaults));
    return { gameState: structuredClone(defaults) };
  },
};

const initialState = {
  gameState: {
    ...structuredClone(defaults),
    ...(JSON.parse(localStorage.getItem("gameState")) ??
      structuredClone(defaults)),
  },
};

const configureStorage = () => {
  localStorage.setItem("gameState", JSON.stringify(initialState.gameState));
  initStorage(actions, initialState);
};

export default configureStorage;
