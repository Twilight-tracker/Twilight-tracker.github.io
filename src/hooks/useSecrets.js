import { useStorage } from "./useStorage";

export const useSecrets = () => {
  const { storage } = useStorage();
  const colors = storage.gameSettings.colors;
  const secrets = storage.gameState.secrets;

  return secrets.map((playerSecrets, index) => {
    const colorId = colors[index].colorId;
    return {
      colorId,
      playerSecrets: playerSecrets
        .filter((secret) => secret.taken && secret.cardId)
        .map(({ cardId }) => cardId),
    };
  });
};
