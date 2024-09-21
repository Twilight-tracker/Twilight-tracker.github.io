import { useStorage } from "../../../../hooks/useStorage";
import PlayerNumberField from "./PlayerNumberField";

const ExtraField = ({ className, playerIndex }) => {
  const { storage, dispatch } = useStorage();
  const colorId = storage.gameSettings.colors[playerIndex].colorId;
  const value = storage.gameState.extraPoints[playerIndex];
  const onChange = (value) =>
    dispatch("SET_EXTRA_POINTS", { playerIndex, value });

  return (
    <PlayerNumberField
      className={className}
      colorId={colorId}
      value={value}
      onChange={onChange}
      defaultValue={0}
      aria-label="extra points"
    />
  );
};

export default ExtraField;
