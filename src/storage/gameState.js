import { initStorage } from "../hooks/useStorage";

const objectiveCount = 10;
const playerCount = 6;
const secretCount = 4;
const defaultPoints = [...Array(playerCount).keys()].map((_) => false);
const defaultObjective = { cardId: undefined, points: defaultPoints, date: -1 };
const defaultExtraPoints = [...Array(playerCount).keys()].map((_) => 0);
const defaultSecret = {
  taken: false,
  cardId: undefined,
};
const defaultPlayerSecrets = [...Array(secretCount).keys()].map((_) =>
  structuredClone(defaultSecret)
);
const defaultSecrets = [...Array(playerCount).keys()].map(
  (_) => structuredClone(defaultPlayerSecrets)
);

const defaults = {
  objectives: [...Array(objectiveCount).keys()].map((_) =>
    structuredClone(defaultObjective)
  ),
  secrets: structuredClone(defaultSecrets),
  extraPoints: structuredClone(defaultExtraPoints),
};

const validateCardIndex = (cardIndex) =>
  cardIndex >= 0 && cardIndex < objectiveCount;
const validatePlayerIndex = (playerIndex) =>
  playerIndex >= 0 && playerIndex < playerCount;
const validateSecretIndex = (secretIndex) =>
  secretIndex >= 0 && secretIndex < secretCount;

export const actions = {
  SET_OBJECTIVE: (currentState, { cardIndex, cardId }) => {
    if (!validateCardIndex(cardIndex)) {
      return { status: "error", meassage: "Incorrect cardIndex" };
    }
    const gameState = { ...currentState.gameState };
    gameState.objectives[cardIndex] = {
      ...gameState.objectives[cardIndex],
      cardId: cardId,
      date: Date.now()
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

  SET_SECRET_TAKEN: (currentState, { playerIndex, secretIndex }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    if (!validateSecretIndex(secretIndex)) {
      return { status: "error", message: "Incorrect secret index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex][secretIndex] = {
      ...gameState.secrets[playerIndex][secretIndex],
      taken: true,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  SET_SECRET: (currentState, { playerIndex, secretIndex, cardId }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    if (!validateSecretIndex(secretIndex)) {
      return { status: "error", message: "Incorrect secret index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex][secretIndex] = {
      ...gameState.secrets[playerIndex][secretIndex],
      cardId: cardId,
    };
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
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
    return { gameState: gameState };
  },

  RESET_PLAYER_SECRETS: (currentState, { playerIndex }) => {
    if (!validatePlayerIndex(playerIndex)) {
      return { status: "error", message: "Incorrect player index" };
    }
    const gameState = { ...currentState.gameState };
    gameState.secrets[playerIndex] = structuredClone(defaultPlayerSecrets);
    localStorage.setItem("gameState", JSON.stringify(gameState));
    return { gameState: gameState };
  },

  RESET_SECRETS: (currentState, _) => {
    const gameState = {
      ...currentState.gameState,
      secrets: structuredClone(defaultSecrets),
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
