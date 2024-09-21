import { useStorage } from "./useStorage";
import objectiveCards from "../data/objectives.json";

const stagePoints = {
  stage1: 1,
  stage2: 2,
  secret: 1,
};

export const useTotalPoints = () => {
  const { storage } = useStorage();
  const {
    extraPoints,
    mecatolPoints,
    objectives,
    secrets,
    relics,
    throneSupports,
  } = storage.gameState;
  const { emphidiaCrown, throneShard } = relics;
  const { colors, factions } = storage.gameSettings;

  const totalPoints = [...Array(6).keys()].map(
    (index) =>
      extraPoints[index] +
      mecatolPoints[index] +
      (emphidiaCrown === index ? 1 : 0) +
      (throneShard === index ? 1 : 0) +
      objectives.reduce(
        (accumulator, objective) =>
          accumulator +
          (objective.cardId && objective.points[index]
            ? stagePoints[objectiveCards[objective.cardId].stage]
            : 0),
        0
      ) +
      secrets[index].reduce(
        (accumulator, secret) =>
          accumulator +
          (secret.taken && secret.cardId
            ? 1 //stagePoints[objectives[secret.cardId].stage]
            : 0),
        0
      ) +
      throneSupports.reduce(
        (accumulator, receiver) => accumulator + (receiver === index ? 1 : 0),
        0
      )
  );
  const [unique, maxValue, maxIndex] = totalPoints.reduce(
    ([unique, maxValue, maxIndex], point, index) =>
      point === maxValue
        ? [false, maxValue, index]
        : point > maxValue
        ? [true, point, index]
        : [unique, maxValue, maxIndex],
    [true, -1, -1]
  );
  const leader = unique
    ? {
        index: maxIndex,
        points: maxValue,
        colorId: colors[maxIndex].colorId,
        factionId: factions[maxIndex].factionId,
      }
    : { index: -1 };
  return { leader, totalPoints };
};
