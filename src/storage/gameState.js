import { initStorage } from "../hooks/useStorage";

const objectiveCount = 10;
const playerCount = 6;
const defaultPoints = [...Array(playerCount).keys()].map((_) => false);
const defaultObjective = { cardId: undefined, points: defaultPoints };
const defaultExtraPoints = [...Array(playerCount).keys()].map((_) => 0);

const defaults = {
  objectives: [...Array(objectiveCount).keys()].map((_) =>
    structuredClone(defaultObjective)
  ),
  extraPoints: structuredClone(defaultExtraPoints),
};

const validateCardIndex = (cardIndex) => {
  return cardIndex >= 0 && cardIndex < objectiveCount;
};

const validatePlayerIndex = (playerIndex) => {
  return playerIndex >= 0 && playerIndex < playerCount;
};

export const actions = {
  SET_OBJECTIVE: (currentState, { cardIndex, cardId }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", meassage: "Incorrect cardIndex" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex] = {
      ...gameState.objectives[cardIndex],
      cardId: cardId,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  TOGGLE_POINTS: (currentState, { cardIndex, playerIndex }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", message: "Incorrect card index" };
    }
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    const objective = gameState.objectives[cardIndex];
    const points = objective.points ?? [...defaultPoints];
    points[playerIndex] = !points[playerIndex];
    gameState.objectives[cardIndex] = {
      ...objective,
      points: points,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  RESET_OBJECTIVE: (currentState, { cardIndex }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", message: "Incorrect card index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex] = structuredClone(defaultObjective);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  RESET_OBJECTIVE_POINTS: (currentState, { cardIndex }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", message: "Incorrect card index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex] = {
      ...gameState.objectives[cardIndex],
      points: [...defaultPoints],
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  SET_EXTRA_POINTS: (currentState, { playerIndex, value }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.extraPoints[playerIndex] = value;
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  RESET_EXTRA_POINTS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      extraPoints: [...defaultExtraPoints],
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

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

export const configureStorage = () => {
  localStorage.setItem("gameState", JSON.stringify(initialState.gameState));
  initStorage(actions, initialState);
};
