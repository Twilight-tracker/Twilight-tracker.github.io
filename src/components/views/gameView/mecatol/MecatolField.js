import { useStorage } from "../../../../hooks/useStorage";
import PlayerNumberField from "../flowers/PlayerNumberField";

const MecatolField = ({ className, playerIndex }) => {
  const { storage, dispatch } = useStorage();
  const colorId = storage.gameSettings.colors[playerIndex].colorId;
  const value = storage.gameState.mecatolPoints[playerIndex];
  const onChange = (value) =>
    dispatch("SET_MECATOL_POINTS", { playerIndex, value });

  return (
    <PlayerNumberField
      className={className}
      colorId={colorId}
      value={value}
      onChange={onChange}
      defaultValue={0}
      aria-label="mecatol points"
    />
  );
};

export default MecatolField;
