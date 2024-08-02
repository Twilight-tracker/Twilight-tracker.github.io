import { useStorage } from "./useStorage";
import objectives from "../data/objectives.json";

const stagePoints = {
  stage1: 1,
  stage2: 2,
  secret: 1
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
      )
  );
  return totalPoints;
};
