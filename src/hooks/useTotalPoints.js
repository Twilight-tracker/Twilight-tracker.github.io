import { useStorage } from "./useStorage";
import objectives from "../data/objectives.json";

const stagePoints = {
  stage1: 1,
  stage2: 2,
  secret: 1,
};

export const useTotalPoints = () => {
  const { storage } = useStorage();
  const totalPoints = storage.gameState.extraPoints.map(
    (extra, index) =>
      extra +
      storage.gameState.objectives.reduce(
        (accumulator, objective) =>
          accumulator +
          (objective.cardId && objective.points[index]
            ? stagePoints[objectives[objective.cardId].stage]
            : 0),
        0
      ) +
      storage.gameState.secrets[index].reduce(
        (accumulator, secret) =>
          accumulator +
          (secret.taken && secret.cardId
            ? 1 //stagePoints[objectives[secret.cardId].stage]
            : 0),
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
        colorId: storage.gameSettings.colors[maxIndex].colorId,
        factionId: storage.gameSettings.factions[maxIndex].factionId,
      }
    : { index: -1 };
  return { leader, totalPoints };
};
